
export type Activity = {
  name: string,
  date: string | Date,
  manager: string,
};

export type Note = {
  manager: string,
  date: string | Date,
  text: string
};

export type Notes = Note[];

export type Message = {
  manager: string,
  subject: string,
  date: string | Date,
  text: string
};

export type Messages = Message[];

export const taskStatusList: string[] = [
  'Open',
  'In Progress',
  'Deferred',
  'Completed',
];

export const taskPriorityList: string[] = [
  'Low',
  'Normal',
  'High',
];

export type TaskPriority = (typeof taskPriorityList)[number];

export type TaskStatus = (typeof taskStatusList)[number];

export type Task = {
  activities: Activity[],
  description: string,
  calendarId?: number,
  endDate?: Date,
  id?: number
  text: string,
  company: string,
  priority: TaskPriority,
  startDate: string | Date | number,
  dueDate: string | Date | number,
  owner: string,
  status: TaskStatus,
  notes: Notes,
  messages: Messages,
  parentId?: number,
  progress: number,
};


export const newTask: Task = {
  id: undefined,
  text: '',
  description: '',
  company: '',
  priority: 'Low',
  startDate: new Date(),
  dueDate: new Date(),
  owner: '',
  status: 'Open',
  activities: [],
  notes: [],
  messages: [],
  parentId: undefined,
  progress: 0,
};