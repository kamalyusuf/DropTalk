import { toast } from "react-toastify";

const adjectives = [
  "Other",
  "New",
  "Good",
  "Old",
  "Little",
  "Great",
  "Small",
  "Young",
  "Long",
  "Black",
  "High",
  "Only",
  "Big",
  "White",
  "Political",
  "Red",
  "Blue",
  "Green",
  "Happy",
  "Sad",
  "Bright",
  "Dark",
  "Soft",
  "Hard",
  "Quiet"
];

const nouns = [
  "Man",
  "World",
  "Hand",
  "Room",
  "Face",
  "Thing",
  "Place",
  "Door",
  "Woman",
  "House",
  "Money",
  "Father",
  "Government",
  "Country",
  "Mother",
  "Car",
  "Tree",
  "Book",
  "City",
  "Dog",
  "Cat",
  "Child",
  "Phone",
  "Computer",
  "Friend"
];

export const generate_display_name = (): string => {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${adj}${noun}`;
};

const pattern = /^[A-Za-z0-9 ]+$/;

export const validate_display_name = (display_name: string): boolean => {
  if (display_name.length < 3) {
    toast.error(`Display name must be at least 3 characters`);

    return false;
  }

  if (!pattern.test(display_name)) {
    toast.error(
      `Invalid display name. Only letters, numbers and white spaces allowed.`
    );

    return false;
  }

  return true;
};
