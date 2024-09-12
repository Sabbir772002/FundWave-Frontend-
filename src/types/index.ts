export interface ICampaign {
    id: string
    title: string
    description: string
    createdAt: string
    mainImage: string
    createdBy: string
    daysLeft: number
    amountRaised: string
    goal: string
    contributors: number
    createdByImage: string
    category: string
    country: string
    type: string | null
}

export interface ILoans {
    _id: string; // ObjectId in MongoDB is represented as a string in TypeScript
    username: string;
    title: string;
    category: string;
    targetAmount: number; // Assuming targetAmount is a number, as shown in your example
    deadlineDate: string; // Use string for ISO date format
    donationType: string;
    minimumCheck: boolean; // Assuming this is a boolean, not a string
    interest: number; // Use number for floating-point values
    bkashNumber: string;
    nagadNumber: string;
    rocketNumber: string;
    story: string;
    createdAt: string; // Use string for ISO date format
    __v: number; // Version key is usually a number
    condition: string;
}


export interface ITestimonial {
    id: string
    testimonial: string
    createdBy: string
    createdByImage: string
    company: string
    jobPosition: string
}

export interface ICountry {
    name: string
    code: string
    emoji: string
    unicode: string
    image: string
}

export interface ICurrency {
    cc: string
    symbol: string
    name: string
}
