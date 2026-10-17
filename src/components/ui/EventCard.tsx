import Image from "next/image";

interface EventCardProps {
  title: string;
  description: string;
  date: string;
  category: "ec" | "gl";
  tagLabel: string;
  image: string;
  location?: string | null;
}

export default function EventCard({
  title,
  description,
  date,
  category,
  tagLabel,
  image,
  location,
}: EventCardProps) {
  return (
    <div className="event-card">
      {/* <Image
        src={image}
        alt={title}
        width={400}
        height={200}
        className="event-card__img"
      /> */}
      <div className="event-card__body">
        <span className={`event-card__tag event-card__tag--${category}`}>
          {tagLabel}
        </span>
        <div className="event-card__date">{date}</div>
        <div className="event-card__title">{title}</div>
        <p className="event-card__text">{description}</p>
        {location && (
          <p className="event-card__text" style={{ marginTop: "0.25rem", fontSize: "0.75rem" }}>
            📍 {location}
          </p>
        )}
      </div>
    </div>
  );
}
