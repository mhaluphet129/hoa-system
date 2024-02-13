interface AnnouncementProps {
  title: string;
  description: string;
  image?: string;
}

interface AnnouncementControllerProps {
  open: boolean;
  onSave: (args: AnnouncementProps) => void;
  close: () => void;
}

interface EventCardProps {
  image: string;
  title: string;
  description: string;
  id: string;
}

export type { AnnouncementProps, AnnouncementControllerProps, EventCardProps };
