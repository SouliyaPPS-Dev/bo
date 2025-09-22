import { createFileRoute } from '@tanstack/react-router';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Stack,
  Button,
  TextField,
} from '@mui/material';
import {
  ExpandMore,
  Email,
  Phone,
  Chat,
  Help,
  Send,
  Article,
  VideoLibrary,
} from '@mui/icons-material';
import PageContainer from '@/components/PageContainer';
import PageHeader from '@/components/PageHeader';
import { useState } from 'react';

export const Route = createFileRoute('/_app/support')({
  component: SupportPage,
});

function SupportPage() {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleAccordionChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const faqs = [
    {
      id: 'faq1',
      question: 'How do I reset my password?',
      answer:
        'You can reset your password by clicking on the "Forgot Password" link on the login page. Enter your email address and we will send you instructions to reset your password.',
    },
    {
      id: 'faq2',
      question: 'How can I upgrade my subscription plan?',
      answer:
        'To upgrade your subscription, go to Settings > Billing & Plans. Choose your desired plan and follow the payment instructions. Your new features will be available immediately after payment.',
    },
    {
      id: 'faq3',
      question: 'Where can I find API documentation?',
      answer:
        'Our comprehensive API documentation is available at docs.example.com/api. You can also access it from the Developer section in your dashboard.',
    },
    {
      id: 'faq4',
      question: 'How do I export my data?',
      answer:
        'You can export your data from the Reports section. Click on the Export button and choose your preferred format (CSV, Excel, or PDF). The download will start automatically.',
    },
    {
      id: 'faq5',
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers.',
    },
  ];

  const contactMethods = [
    {
      icon: <Email />,
      title: 'Email Support',
      description: 'Get help via email',
      contact: 'support@example.com',
      action: 'Send Email',
      color: 'primary.main',
    },
    {
      icon: <Phone />,
      title: 'Phone Support',
      description: 'Talk to our team',
      contact: '+1 (555) 123-4567',
      action: 'Call Now',
      color: 'success.main',
    },
    {
      icon: <Chat />,
      title: 'Live Chat',
      description: 'Chat with support',
      contact: 'Available 24/7',
      action: 'Start Chat',
      color: 'info.main',
    },
  ];

  const resources = [
    {
      icon: <Article />,
      title: 'Documentation',
      description: 'Browse our comprehensive guides',
      link: 'View Docs',
    },
    {
      icon: <VideoLibrary />,
      title: 'Video Tutorials',
      description: 'Watch step-by-step tutorials',
      link: 'Watch Videos',
    },
    {
      icon: <Help />,
      title: 'Help Center',
      description: 'Find answers to common questions',
      link: 'Visit Help Center',
    },
  ];

  return (
    <PageContainer>
      <PageHeader
        title='Support'
        subtitle='Get help and find answers to your questions'
      />
      <Grid container spacing={3}>
        {/* Contact Methods */}
        <Grid size={12}>
          <Typography variant='h6' gutterBottom>
            Contact Support
          </Typography>
        </Grid>
        {contactMethods.map((method, index) => (
          <Grid
            key={index}
            size={{
              xs: 12,
              md: 4
            }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Stack spacing={2}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: `${method.color.split('.')[0]}.50`,
                      color: method.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {method.icon}
                  </Box>
                  <Box>
                    <Typography variant='h6' gutterBottom>
                      {method.title}
                    </Typography>
                    <Typography
                      variant='body2'
                      color='text.secondary'
                      gutterBottom
                    >
                      {method.description}
                    </Typography>
                    <Typography variant='body2' fontWeight={600}>
                      {method.contact}
                    </Typography>
                  </Box>
                  <Button variant='contained' size='small'>
                    {method.action}
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* FAQ Section */}
        <Grid
          size={{
            xs: 12,
            md: 8
          }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant='h6' gutterBottom>
              Frequently Asked Questions
            </Typography>
            <Box sx={{ mt: 2 }}>
              {faqs.map((faq) => (
                <Accordion
                  key={faq.id}
                  expanded={expanded === faq.id}
                  onChange={handleAccordionChange(faq.id)}
                  elevation={0}
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:not(:last-child)': {
                      borderBottom: 0,
                    },
                    '&:before': {
                      display: 'none',
                    },
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography fontWeight={500}>{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant='body2' color='text.secondary'>
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Resources */}
        <Grid
          size={{
            xs: 12,
            md: 4
          }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant='h6' gutterBottom>
              Resources
            </Typography>
            <Stack spacing={2} sx={{ mt: 2 }}>
              {resources.map((resource, index) => (
                <Card key={index} variant='outlined'>
                  <CardContent>
                    <Stack direction='row' spacing={2} alignItems='flex-start'>
                      <Box
                        sx={{
                          color: 'primary.main',
                          mt: 0.5,
                        }}
                      >
                        {resource.icon}
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          variant='body1'
                          fontWeight={500}
                          gutterBottom
                        >
                          {resource.title}
                        </Typography>
                        <Typography
                          variant='body2'
                          color='text.secondary'
                          gutterBottom
                        >
                          {resource.description}
                        </Typography>
                        <Button size='small' sx={{ mt: 1, p: 0 }}>
                          {resource.link} →
                        </Button>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Contact Form */}
        <Grid size={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant='h6' gutterBottom>
              Send us a Message
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid
                size={{
                  xs: 12,
                  md: 6
                }}>
                <TextField
                  fullWidth
                  label='Name'
                  variant='outlined'
                  size='small'
                />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  md: 6
                }}>
                <TextField
                  fullWidth
                  label='Email'
                  variant='outlined'
                  size='small'
                  type='email'
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label='Subject'
                  variant='outlined'
                  size='small'
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label='Message'
                  variant='outlined'
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid size={12}>
                <Button variant='contained' startIcon={<Send />}>
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
