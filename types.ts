
export interface Education {
  school: string;
  major: string;
  status: string;
  period: string;
}

export interface Experience {
  organization: string;
  role: string;
  period: string;
  description?: string;
  longDescription?: string; // Added for detailed popup
  category: 'Research/Education' | 'Operation/Projects';
}

export interface Publication {
  title: string;
  author: string;
  journal: string;
  date: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface ProfileData {
  name: string;
  nameEn: string;
  title: string;
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  education: Education[];
  experience: Experience[];
  publications: Publication[];
  certifications: Certification[];
  globalActivities: string[];
  lectures: {
    public: string[];
    welfare: string[];
  };
}
