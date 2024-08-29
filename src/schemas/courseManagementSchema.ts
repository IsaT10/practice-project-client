import { z } from 'zod';

import dayjs from 'dayjs';

// Define a custom date validation with a required message
const dateSchema = z.custom(
  (val) => {
    return dayjs.isDayjs(val);
  },
  {
    message: 'Please select a date',
  }
);

export const semesterRegistrationSchema = z
  .object({
    academicSemester: z.string({
      required_error: 'Please select a Academic semester',
    }),

    endDate: dateSchema.refine((val) => val),

    minCredits: z
      .string({ required_error: 'Min credits are required' })
      .refine((val) => parseInt(val, 10) >= 6, {
        message: 'Min credits must be at least 6',
      }), // Additional validation (example)

    maxCredits: z
      .string({ required_error: 'Max credits are required' }) // Check if the value is provided
      .refine((val) => parseInt(val, 10) <= 18, {
        message: 'Max credits must be less than or equal to 18',
      }), // Check the numeric value

    startDate: dateSchema.refine((val) => val),

    status: z.enum(['ONGOING', 'ENDED', 'UPCOMING'], {
      required_error: 'Please select a status',
    }),
  })
  .refine(
    (data) => parseInt(data.maxCredits, 10) >= parseInt(data.minCredits, 10),
    {
      message: 'Max credits must be greater than or equal to min credits',
      path: ['maxCredits'],
    }
  );

export const createCourseSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
  prefix: z.string({
    required_error: 'Prefix is required',
  }),
  code: z.string({
    required_error: 'Code is required',
  }),
  credits: z.string({
    required_error: 'Credits is required',
  }),
  preRequisiteCourses: z.any(),
});
