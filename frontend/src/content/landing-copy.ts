export const landingCopy = {
  headline: 'Find any place on campus. Know what is inside.',
  introduction: [
    'CNS shows you the building, what is inside it,',
    'and the walking route to get there.',
  ].join(' '),
  footer: 'CNS helps you find your way around campus.',
  animationCaption: 'Pick a place. Follow the red trail. Arrive.',
  howItWorks: [
    {
      title: 'Search',
      description:
        'Type a building, office or lab. Misspelled it? CNS still finds it.',
    },
    {
      title: 'Navigate',
      description:
        'See where you are, the red trail and the distance as you walk.',
    },
    {
      title: 'Arrive',
      description: [
        'Get a clear message when you reach your destination,',
        'and see what is inside.',
      ].join(' '),
    },
  ],
  about: [
    {
      title: 'Who it is for',
      description: [
        'Students finding lecture halls and offices, and visitors finding',
        'places their school has opened to them.',
      ].join(' '),
    },
    {
      title: 'How it is used',
      description: [
        'Search a place, open its card and follow a walking route',
        'on your phone.',
      ].join(' '),
    },
    {
      title: 'How it helps',
      description: [
        'Spend less time finding places and arrive at classes and',
        'appointments on time.',
      ].join(' '),
    },
  ],
} as const;
