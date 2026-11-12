import { StickyNote, CanvasBlockId } from '../types';

export interface CanvasBlockDefinition {
  id: CanvasBlockId;
  title: string;
  subtitle: string;
  colorScheme: 'blue' | 'yellow' | 'peach' | 'pink' | 'green' | 'teal';
  columnClass: string;
}

export const CANVAS_BLOCKS: CanvasBlockDefinition[] = [
  {
    id: 'key_partners',
    title: 'Key Partners',
    subtitle: 'What are your key partners to get competitive advantage?',
    colorScheme: 'blue',
    columnClass: 'col-span-12 md:col-span-4 lg:col-span-2',
  },
  {
    id: 'key_activities',
    title: 'Key Activities',
    subtitle: 'What are the key steps to move ahead to your customers?',
    colorScheme: 'blue',
    columnClass: 'col-span-12 md:col-span-4 lg:col-span-3',
  },
  {
    id: 'value_propositions',
    title: 'Key Propositions',
    subtitle: 'How will you make your customers\' life happier?',
    colorScheme: 'yellow',
    columnClass: 'col-span-12 md:col-span-4 lg:col-span-2',
  },
  {
    id: 'customer_relationships',
    title: 'Customer Relationships',
    subtitle: 'How often will you interact with your customers?',
    colorScheme: 'peach',
    columnClass: 'col-span-12 md:col-span-6 lg:col-span-3',
  },
  {
    id: 'customer_segments',
    title: 'Customer Segments',
    subtitle: 'Who are your customers? Describe your target audience in a couple of words.',
    colorScheme: 'pink',
    columnClass: 'col-span-12 md:col-span-6 lg:col-span-2',
  },
  {
    id: 'key_resources',
    title: 'Key Resources',
    subtitle: 'What resources do you need to make your idea work?',
    colorScheme: 'blue',
    columnClass: 'col-span-12 md:col-span-6 lg:col-span-5',
  },
  {
    id: 'channels',
    title: 'Channels',
    subtitle: 'How are you going to reach your customers?',
    colorScheme: 'peach',
    columnClass: 'col-span-12 md:col-span-6 lg:col-span-5',
  },
  {
    id: 'cost_structure',
    title: 'Cost Structure',
    subtitle: 'How much are you planning to spend on product development & marketing?',
    colorScheme: 'green',
    columnClass: 'col-span-12 md:col-span-6 lg:col-span-6',
  },
  {
    id: 'revenue_streams',
    title: 'Revenue Streams',
    subtitle: 'How much are you planning to earn in a certain period? Compare costs & revenues.',
    colorScheme: 'teal',
    columnClass: 'col-span-12 md:col-span-6 lg:col-span-6',
  },
];

export const INITIAL_STICKY_NOTES: StickyNote[] = [
  // Key Partners
  {
    id: 'kp-1',
    blockId: 'key_partners',
    content: 'Zig\nGrab\nGojek\nTada\nRyde',
    color: 'blue',
    segmentTag: 'all',
  },
  {
    id: 'kp-2',
    blockId: 'key_partners',
    content: 'News website or online magazines',
    color: 'blue',
    segmentTag: 'working_adults',
  },

  // Key Activities
  {
    id: 'ka-1',
    blockId: 'key_activities',
    content: 'APIs from Key Partners to pull latest pricing and nearest available driver',
    color: 'blue',
    segmentTag: 'all',
  },
  {
    id: 'ka-2',
    blockId: 'key_activities',
    content: 'APIs from Key Partners to pull latest news on economy, local news, hobbies, travels, etc',
    color: 'blue',
    segmentTag: 'working_adults',
  },

  // Key Resources
  {
    id: 'kr-1',
    blockId: 'key_resources',
    content: 'Digital anchor platform with connect APIs to all available ride hailing applications',
    color: 'blue',
    segmentTag: 'all',
  },
  {
    id: 'kr-2',
    blockId: 'key_resources',
    content: 'Digital anchor platform with connect APIs to all news feed',
    color: 'blue',
    segmentTag: 'working_adults',
  },

  // Key Propositions
  {
    id: 'vp-1',
    blockId: 'value_propositions',
    content: 'Cheapest and fastest ride available',
    color: 'yellow',
    segmentTag: 'all',
  },
  {
    id: 'vp-2',
    blockId: 'value_propositions',
    content: 'Personalisation of rides. Customer can choose highly rated drivers or pet friendly rides or wheelchair friendly',
    color: 'yellow',
    segmentTag: 'working_adults',
  },
  {
    id: 'vp-3',
    blockId: 'value_propositions',
    content: 'Personalise news feed push to customer',
    color: 'yellow',
    segmentTag: 'working_adults',
  },
  {
    id: 'vp-4',
    blockId: 'value_propositions',
    content: 'Aim to reduce cost and waiting time during peak hours',
    color: 'yellow',
    segmentTag: 'working_adults',
  },
  {
    id: 'vp-5',
    blockId: 'value_propositions',
    content: 'personalise routes for tourist visiting Singapore',
    color: 'yellow',
    segmentTag: 'tourists',
  },
  {
    id: 'vp-6',
    blockId: 'value_propositions',
    content: 'Insider tips on traffic conditions and prompt on suggested travel time',
    color: 'yellow',
    segmentTag: 'all',
  },

  // Customer Relationships
  {
    id: 'cr-1',
    blockId: 'customer_relationships',
    content: 'Daily based on daily commutes and travels',
    color: 'peach',
    segmentTag: 'working_adults',
  },
  {
    id: 'cr-2',
    blockId: 'customer_relationships',
    content: 'Daily based on push notifications',
    color: 'peach',
    segmentTag: 'all',
  },
  {
    id: 'cr-3',
    blockId: 'customer_relationships',
    content: 'Daily personalise news feed based on their preference',
    color: 'peach',
    segmentTag: 'working_adults',
  },

  // Channels
  {
    id: 'ch-1',
    blockId: 'channels',
    content: 'Social media, traditional advertisement, mobile application',
    color: 'peach',
    segmentTag: 'all',
  },
  {
    id: 'ch-2',
    blockId: 'channels',
    content: 'Advertisement space at airport and central business districts',
    color: 'peach',
    segmentTag: 'tourists',
  },
  {
    id: 'ch-3',
    blockId: 'channels',
    content: 'Sales team to reach out to corporates',
    color: 'peach',
    segmentTag: 'corporates',
  },

  // Customer Segments
  {
    id: 'cs-1',
    blockId: 'customer_segments',
    content: 'Young working adults who values time',
    color: 'pink',
    segmentTag: 'working_adults',
  },
  {
    id: 'cs-2',
    blockId: 'customer_segments',
    content: 'Tourists',
    color: 'pink',
    segmentTag: 'tourists',
  },
  {
    id: 'cs-3',
    blockId: 'customer_segments',
    content: 'Corporates who give it as employee benefit',
    color: 'pink',
    segmentTag: 'corporates',
  },

  // Cost Structure
  {
    id: 'cos-1',
    blockId: 'cost_structure',
    content: 'Minimal cost as we will not own vehicle fleets and drivers',
    color: 'green',
    segmentTag: 'all',
  },
  {
    id: 'cos-2',
    blockId: 'cost_structure',
    content: 'Marketing period of a year for awareness',
    color: 'green',
    segmentTag: 'all',
  },
  {
    id: 'cos-3',
    blockId: 'cost_structure',
    content: 'Discount vouchers to be given for first time users',
    color: 'green',
    segmentTag: 'working_adults',
  },

  // Revenue Streams
  {
    id: 'rev-1',
    blockId: 'revenue_streams',
    content: 'A small commission fee to be taken from chosen ride hailing operator',
    color: 'teal',
    segmentTag: 'all',
  },
  {
    id: 'rev-2',
    blockId: 'revenue_streams',
    content: 'Advertising space from our digital anchor platform',
    color: 'teal',
    segmentTag: 'all',
  },
  {
    id: 'rev-3',
    blockId: 'revenue_streams',
    content: 'Partner with third party providers such as esim to be sold on our digital anchor platform. to be earn for every successful sign up',
    color: 'teal',
    segmentTag: 'tourists',
  },
];
