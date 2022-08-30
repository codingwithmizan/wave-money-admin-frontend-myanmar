import { FC } from "react";
import { avatarFormatter, humanize } from "@/lib/helpers";

interface Data {
  img: string;
  name: string;
}
interface CustomAvatarProp {
  data: Data;
  size: number;
  title?: string;
  border?: number;
  textSize?: number;
}

export const CustomAvatar: FC<CustomAvatarProp> = ({
  data,
  size,
  title = "profile image",
  border = 3,
  textSize = 48,
}) => {
  return (
    <div>
      {data?.img ? (
        <img
          src={data?.img}
          alt={title}
          className={` rounded-full overflow-hidden bg-sky-600`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            border: `${border}px solid rgb(2 132 199)`,
          }}
        />
      ) : (
        <div
          style={{
            width: `${size}px`,
            height: `${size}px`,
          }}
          className="rounded-full bg-sky-700 flex justify-center items-center"
        >
          <div
            className="text-gray-100"
            style={{
              fontSize: `${textSize}px`,
            }}
          >
            {avatarFormatter(data?.name ? data.name : "")}
          </div>
        </div>
      )}
    </div>
  );
};
