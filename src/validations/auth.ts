import { z } from 'zod';
const authSchema = z.object({
  username: z
    .string('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .regex(/^[A-Za-z\s]+$/, 'Username must contain only letters'),
  password: z
    .string('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export default authSchema;
