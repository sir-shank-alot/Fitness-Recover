import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { 
  collection, query, where, onSnapshot, 
  doc, setDoc, deleteDoc, updateDoc, serverTimestamp 
} from 'firebase/firestore';
import { auth, db, signInWithGoogle, signOutUser, handleFirestoreError, OperationType } from '../lib/firebase';
import { WorkoutLogEntry } from '../types/training';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  cloudLogs: WorkoutLogEntry[];
  logsLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  saveWorkoutLog: (log: WorkoutLogEntry) => Promise<void>;
  deleteWorkoutLog: (id: string) => Promise<void>;
  syncLocalLogsToCloud: (localLogs: WorkoutLogEntry[]) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [cloudLogs, setCloudLogs] = useState<WorkoutLogEntry[]>([]);
  const [logsLoading, setLogsLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Listen to Firestore workout_logs for authenticated user
  useEffect(() => {
    if (!currentUser) {
      setCloudLogs([]);
      setLogsLoading(false);
      return;
    }

    setLogsLoading(true);
    const path = 'workout_logs';
    const q = query(collection(db, path), where('userId', '==', currentUser.uid));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetched: WorkoutLogEntry[] = [];
        snapshot.forEach((docSnap) => {
          const d = docSnap.data();
          fetched.push({
            id: docSnap.id,
            date: d.date || new Date().toISOString().split('T')[0],
            athleteId: d.athleteId,
            sessionName: d.sessionName,
            prePainScore: d.prePainScore,
            postPainScore: d.postPainScore,
            exercisesCompleted: d.exercisesCompleted || [],
            notes: d.notes || '',
          });
        });
        // Sort newest first
        fetched.sort((a, b) => b.date.localeCompare(a.date));
        setCloudLogs(fetched);
        setLogsLoading(false);
      },
      (error) => {
        setLogsLoading(false);
        handleFirestoreError(error, OperationType.LIST, path);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (e) {
      console.error(e);
    }
  };

  const saveWorkoutLog = async (log: WorkoutLogEntry) => {
    if (!currentUser) return;
    const path = 'workout_logs';
    const logId = log.id.startsWith('log-') ? log.id : `log-${Date.now()}`;
    const docRef = doc(db, path, logId);

    const payload = {
      id: logId,
      userId: currentUser.uid,
      athleteId: log.athleteId,
      sessionName: log.sessionName,
      date: log.date,
      prePainScore: Number(log.prePainScore),
      postPainScore: Number(log.postPainScore),
      exercisesCompleted: log.exercisesCompleted,
      notes: log.notes || '',
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    try {
      await setDoc(docRef, payload);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `${path}/${logId}`);
    }
  };

  const deleteWorkoutLog = async (id: string) => {
    if (!currentUser) return;
    const path = 'workout_logs';
    const docRef = doc(db, path, id);

    try {
      await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${path}/${id}`);
    }
  };

  const syncLocalLogsToCloud = async (localLogs: WorkoutLogEntry[]) => {
    if (!currentUser || localLogs.length === 0) return;
    for (const log of localLogs) {
      await saveWorkoutLog(log);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        cloudLogs,
        logsLoading,
        signIn: handleSignIn,
        signOut: handleSignOut,
        saveWorkoutLog,
        deleteWorkoutLog,
        syncLocalLogsToCloud,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
