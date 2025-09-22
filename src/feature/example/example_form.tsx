import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';

type FormData = {
  name: string;
  email: string;
};

export default function ExampleForm() {
  const [submitted, setSubmitted] = useState<FormData | null>(null);

  const form = useForm({
    defaultValues: { name: '', email: '' },
    onSubmit: ({ value }) => {
      setSubmitted(value);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void form.handleSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <form.Field
          name='name'
          validators={{
            onChange: ({ value }) => {
              const result = z
                .string()
                .min(1, 'Name is required')
                .safeParse(value);
              return result.success
                ? undefined
                : result.error.issues[0]?.message;
            },
          }}
        >
          {(field) => {
            const fieldValue =
              typeof field.state.value === 'string' ? field.state.value : '';
            const errorMessage = field.state.meta.errors[0];
            const displayError =
              typeof errorMessage === 'string' ? errorMessage : '';

            return (
              <TextField
                label='Name'
                value={fieldValue}
                onChange={(e) => field.handleChange(e.target.value)}
                error={!!field.state.meta.errors.length}
                helperText={displayError}
              />
            );
          }}
        </form.Field>
        <form.Field
          name='email'
          validators={{
            onChange: ({ value }) => {
              const result = z.string().email('Invalid email').safeParse(value);
              return result.success
                ? undefined
                : result.error.issues[0]?.message;
            },
          }}
        >
          {(field) => {
            const fieldValue =
              typeof field.state.value === 'string' ? field.state.value : '';
            const errorMessage = field.state.meta.errors[0];
            const displayError =
              typeof errorMessage === 'string' ? errorMessage : '';

            return (
              <TextField
                label='Email'
                value={fieldValue}
                onChange={(e) => field.handleChange(e.target.value)}
                error={!!field.state.meta.errors.length}
                helperText={displayError}
              />
            );
          }}
        </form.Field>
        <Button variant='contained' type='submit'>
          Submit
        </Button>
        {submitted && <pre>{JSON.stringify(submitted, null, 2)}</pre>}
      </Stack>
    </form>
  );
}
