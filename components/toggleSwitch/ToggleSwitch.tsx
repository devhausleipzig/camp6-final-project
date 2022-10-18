interface CustomSwitchProps {
  id: string;
  /**
   * optional text to be displayed to screen readers only
   */
  text?: string;
  /**
   * value of button
   */
  value: boolean | undefined;
  /**
   * clickhandler for button event
   */
  toggleHandler: () => void;
}

/**
 * Toggle Switch to be used on library page. Do we need variants?
 */
export function ToggleSwitch({
  id,
  text,
  value,
  toggleHandler,
}: CustomSwitchProps) {
  return (
    <label
      htmlFor={id}
      className="relative h-4 w-9
			cursor-pointer items-center"
    >
      <input
        id={id}
        type="checkbox"
        name="priority"
        className="peer sr-only"
        checked={value}
        onChange={toggleHandler}
      />
      <div
        className="toggle-bg h-full w-full rounded-full bg-buttonGrey shadow-toggleSwitch 
			"
      ></div>
      <span className="sr-only ml-3 text-sm font-medium">{text}</span>
    </label>
  );
}
