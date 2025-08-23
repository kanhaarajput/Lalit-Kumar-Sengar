'use server';

import { improveProjectDescription } from '@/ai/flows/improve-project-description';
import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

async function saveContactMessage(data: { name: string; email: string; message: string }) {
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      ...data,
      createdAt: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
    return { success: true, message: 'Message sent successfully!' };
  } catch (e) {
    console.error("Error adding document: ", e);
    return { success: false, message: 'Failed to save message to database.' };
  }
}

export async function submitContactForm(prevState: any, formData: FormData) {
  const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    message: z.string().min(1, 'Message is required'),
  });

  const parsed = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: 'Invalid form data.',
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await saveContactMessage(parsed.data);
    if (result.success) {
      return { success: true, message: 'Message sent successfully!' };
    }
    return { success: false, message: 'Failed to send message.' };
  } catch (error) {
    return { success: false, message: 'An unexpected error occurred.' };
  }
}

export async function improveDescriptionAction(currentDescription: string) {
  if (!currentDescription) {
    return { success: false, message: 'No description provided.' };
  }

  try {
    const result = await improveProjectDescription({
      projectDescription: currentDescription,
    });
    return { success: true, improvedDescription: result.improvedDescription };
  } catch (error) {
    console.error('AI action failed:', error);
    return { success: false, message: 'Failed to generate suggestion from AI.' };
  }
}
