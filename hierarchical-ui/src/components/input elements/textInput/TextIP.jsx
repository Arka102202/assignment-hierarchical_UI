import { useEffect, useRef } from "react";

const TextIP = ({ placeHolder = "Type here ...", value = "", onChange = () => { }, isErr = false, errMsg = "Something went wrong", setIsBlurred = () => { }, isFocusOnLoad = false, type = "text" }) => {


  const ref = useRef();


  useEffect(() => {
    if (isFocusOnLoad && ref.current) ref.current.focus();
  }, [isFocusOnLoad])


  return (
    <div className="text-input-box">
      <input type={type} value={value} placeholder={placeHolder} ref={ref}
        onChange={onChange}
        onFocus={() => setIsBlurred(false)}
        onBlur={() => setIsBlurred(true)} />
      {isErr && <p className="error">{errMsg}</p>}
    </div>
  );
};

export default TextIP;