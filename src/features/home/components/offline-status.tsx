interface Props {
  color?: string
}

export const OfflineStatusIcon = ({ color = "gray" }: Props): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="2rem"
    >
      <path
        fill={color || "currentColor"}
        d="M448 464a16 16 0 0 1-11.3-4.7l-384-384a16 16 0 0 1 22.6-22.6l384 384A16 16 0 0 1 448 464ZM38.7 196.8A119.8 119.8 0 0 0 0 288c0 36 14.4 68.9 40.5 92.6 25.1 22.8 59 35.4 95.5 35.4h192.8a8 8 0 0 0 5.7-13.7L100.9 168.8a8 8 0 0 0-8-2 141.5 141.5 0 0 0-54.2 30Zm437.9 194.4c23.2-18.4 35.4-45.8 35.4-79.2 0-57.6-42-90.6-87.6-100.8a16 16 0 0 1-12-12.3 176 176 0 0 0-49.3-92A153.6 153.6 0 0 0 256 64c-31.1 0-60.1 9-84.6 26.1a8 8 0 0 0-1.2 12.3l291.5 291.4a8 8 0 0 0 10.2 1l4.7-3.6Z"
      />
    </svg>
  )
}
