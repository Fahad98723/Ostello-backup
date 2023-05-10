import router, { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { FaStopwatch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";
import { authSelector, setAuthModalState } from "../../redux/slices/authSlice";

const CountdownTimer = ({ TargetDate, handleOpen }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const distance = TargetDate.getTime() - now;

      if (distance > 0) {
        const dayValue = 1000 * 60 * 60 * 24;
        const hourValue = 1000 * 60 * 60;
        const minuteValue = 1000 * 60;
        const secondValue = 1000;

        const days = Math.floor(distance / dayValue);
        const hours = Math.floor((distance % dayValue) / hourValue);
        const minutes = Math.floor((distance % hourValue) / minuteValue);
        const seconds = Math.floor((distance % minuteValue) / secondValue);

        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
      } else {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [TargetDate]);

  const daysAnimation = useSpring({ number: days, from: { number: 0 } });
  const hoursAnimation = useSpring({ number: hours, from: { number: 0 } });
  const minutesAnimation = useSpring({ number: minutes, from: { number: 0 } });
  const secondsAnimation = useSpring({ number: seconds, from: { number: 0 } });

  const router = useRouter();

  const dispatch = useDispatch();

  const { isAuthenticated, userData } = useSelector(authSelector);

  return (
    <div>
      <div className="bg-[#F6C102] text-center p-5">
        <FaStopwatch className="text-center text-xl w-[30px] h-[40px] mx-auto " />
        <div className="flex justify-center items-center">
          <animated.div className="md:text-[30px] text-[25px]  font-bold">
            {daysAnimation.number.interpolate(
              (num) => `${num.toFixed(0).padStart(2, "0")}`
            )}
          </animated.div>
          <p className="text-[20px] font-bold"> days</p>
          <animated.div className="md:text-[30px] text-[25px]  font-bold ml-2">
            {hoursAnimation.number.interpolate(
              (num) => `${num.toFixed(0).padStart(2, "0")}`
            )}
          </animated.div>
          <p className="text-[20px] font-bold"> hours</p>
          <animated.div className="md:text-[30px] text-[25px]  font-bold ml-2">
            {minutesAnimation.number.interpolate(
              (num) => `${num.toFixed(0).padStart(2, "0")}`
            )}
          </animated.div>
          <p className="text-[20px] font-bold"> minutes</p>
          <animated.div className="md:text-[30px] text-[25px] md:block hidden  font-bold ml-2">
            {secondsAnimation.number.interpolate(
              (num) => `${num.toFixed(0).padStart(2, "0")}`
            )}
          </animated.div>
          <p className="text-[20px] font-bold md:block hidden"> seconds</p>
        </div>

        <p className="text-center text-[27px]  font-bold">
          left for the offer to expire
        </p>
      </div>

      <p
        onClick={() => {
          if (isAuthenticated) {
            router.push("/free-registration-form");
          } else {
            handleOpen();
            dispatch(setAuthModalState(2));
          }
        }}
        className="px-8 py-2 bg-primary w-full md:w-[370px] mx-auto md:my-8 my-3 rounded-md text-[20px] text-center text-white cursor-pointer"
      >
        Find me a coaching center
      </p>
    </div>
  );
};

export default CountdownTimer;
