export const faqItems = [
  {
    question: 'What is CNS?',
    answer: [
      'CNS helps students and visitors find campus buildings, rooms,',
      'offices and services, then follow a walking route.',
    ].join(' '),
  },
  {
    question: 'Which universities will CNS support?',
    answer: [
      'CNS is starting with a campus demo. Join the waitlist for updates',
      'about availability.',
    ].join(' '),
  },
  {
    question: 'Will I need mobile data to navigate?',
    answer: [
      'CNS saves details for a searched place on your device.',
      'Map tiles are not available offline.',
    ].join(' '),
  },
  {
    question: 'Can visitors use CNS without an account?',
    answer:
      'Visitors can browse locations a school has made accessible to guests.',
  },
  {
    question: 'How accurate are the walking routes?',
    answer: [
      'Routes use mapped campus paths and can adjust when you move away',
      'from the trail.',
    ].join(' '),
  },
  {
    question: 'When will CNS be available?',
    answer:
      'Join the waitlist and we will share availability updates by email.',
  },
] as const;
