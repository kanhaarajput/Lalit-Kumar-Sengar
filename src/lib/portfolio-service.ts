import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface HeroData {
  name: string;
  role: string;
  tagline: string;
  available: boolean;
  githubUrl: string;
  linkedinUrl: string;
  email: string;
  phone: string;
  projectsCount: string;
  experience: string;
  commits: string;
  bio: string;
  profileImage: string;
  resumeUrl: string;
}

export interface EducationItem {
  id?: string;
  degree: string;
  institution: string;
  order: number;
}

export interface DriveItem {
  id?: string;
  text: string;
  order: number;
}

export interface TechStack {
  frontend: string[];
  backend: string[];
  tools: string[];
  database?: string[];
  ai?: string[];
}

export interface ProjectItem {
  id?: string;
  name: string;
  description: string;
  tech: string[];
  link: string;
  liveLink: string;
  image: string;
  details: string;
  order: number;
}

// ─── Hero / Profile ──────────────────────────────────────────────────────────

export async function getHeroData(): Promise<HeroData | null> {
  const snap = await getDoc(doc(db, 'portfolio', 'hero'));
  return snap.exists() ? (snap.data() as HeroData) : null;
}

export async function saveHeroData(data: HeroData) {
  await setDoc(doc(db, 'portfolio', 'hero'), { ...data, updatedAt: serverTimestamp() });
}

// ─── Education ───────────────────────────────────────────────────────────────

export async function getEducation(): Promise<EducationItem[]> {
  const snap = await getDocs(collection(db, 'portfolio_education'));
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() } as EducationItem))
    .sort((a, b) => a.order - b.order);
}

export async function addEducation(item: Omit<EducationItem, 'id'>) {
  await addDoc(collection(db, 'portfolio_education'), item);
}

export async function updateEducation(id: string, item: Partial<EducationItem>) {
  await updateDoc(doc(db, 'portfolio_education', id), item);
}

export async function deleteEducation(id: string) {
  await deleteDoc(doc(db, 'portfolio_education', id));
}

// ─── Drives ──────────────────────────────────────────────────────────────────

export async function getDrives(): Promise<DriveItem[]> {
  const snap = await getDocs(collection(db, 'portfolio_drives'));
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() } as DriveItem))
    .sort((a, b) => a.order - b.order);
}

export async function addDrive(item: Omit<DriveItem, 'id'>) {
  await addDoc(collection(db, 'portfolio_drives'), item);
}

export async function updateDrive(id: string, item: Partial<DriveItem>) {
  await updateDoc(doc(db, 'portfolio_drives', id), item);
}

export async function deleteDrive(id: string) {
  await deleteDoc(doc(db, 'portfolio_drives', id));
}

// ─── Tech Stack ──────────────────────────────────────────────────────────────

export async function getTechStack(): Promise<TechStack | null> {
  const snap = await getDoc(doc(db, 'portfolio', 'techstack'));
  return snap.exists() ? (snap.data() as TechStack) : null;
}

export async function saveTechStack(data: TechStack) {
  await setDoc(doc(db, 'portfolio', 'techstack'), { ...data, updatedAt: serverTimestamp() });
}

// ─── Projects ────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<ProjectItem[]> {
  const snap = await getDocs(collection(db, 'portfolio_projects'));
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() } as ProjectItem))
    .sort((a, b) => a.order - b.order);
}

export async function addProject(item: Omit<ProjectItem, 'id'>) {
  await addDoc(collection(db, 'portfolio_projects'), item);
}

export async function updateProject(id: string, item: Partial<ProjectItem>) {
  await updateDoc(doc(db, 'portfolio_projects', id), item);
}

export async function deleteProject(id: string) {
  await deleteDoc(doc(db, 'portfolio_projects', id));
}

// ─── Achievements ────────────────────────────────────────────────────────────

export interface AchievementItem {
  id?: string;
  title: string;
  description: string;
  details?: string;
  date: string;
  image?: string;
  order: number;
}

export async function getAchievements(): Promise<AchievementItem[]> {
  const snap = await getDocs(collection(db, 'portfolio_achievements'));
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() } as AchievementItem))
    .sort((a, b) => a.order - b.order);
}

export async function addAchievement(item: Omit<AchievementItem, 'id'>) {
  await addDoc(collection(db, 'portfolio_achievements'), item);
}

export async function updateAchievement(id: string, item: Partial<AchievementItem>) {
  await updateDoc(doc(db, 'portfolio_achievements', id), item);
}

export async function deleteAchievement(id: string) {
  await deleteDoc(doc(db, 'portfolio_achievements', id));
}
