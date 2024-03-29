import { useEffect, useRef } from "react";

const BasicIP = ({ placeHolder = "Type here ...", value = "", onChange = () => { }, isErr = false, errMsg = "Something went wrong", setIsBlurred = () => { }, isFocusOnLoad = false, type = "text", blurKey = "" }) => {


  const ref = useRef();


  useEffect(() => {
    if (isFocusOnLoad && ref.current) ref.current.focus();
  }, [isFocusOnLoad])


  return (
    <div className="text-input-box">
      <input type={type} value={value} placeholder={placeHolder} ref={ref}
        onClick={e => e.stopPropagation()}
        onChange={onChange}
        onFocus={() => setIsBlurred(false, blurKey)}
        onBlur={() => setIsBlurred(true, blurKey)} />
      {isErr && <p className="error">{errMsg}</p>}
    </div>
  );
};

export default BasicIP;