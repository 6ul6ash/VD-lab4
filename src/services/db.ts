import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import type { Building } from "../types";

const col = collection(db, "buildings");

export const getBuildings = async () => {
  const snap = await getDocs(col);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Building[];
};

export const addBuilding = async (b: Omit<Building, "id">) => {
  await addDoc(col, b);
};

export const upgradeBuilding = async (id: string, level: number) => {
  await updateDoc(doc(db, "buildings", id), { level });
};

export const deleteBuilding = async (id: string) => {
  await deleteDoc(doc(db, "buildings", id));
};