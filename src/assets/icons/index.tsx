import React from 'react';
import {Svg, Circle, Ellipse, Path} from 'react-native-svg';
import {useTheme} from '../../theme';

const UserIcon = ({theme, ...props}: any) => (
  <Svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" {...props}>
    <Circle cx="12" cy="6" r="4" stroke="#1C274C" strokeWidth="1.5" />
    <Ellipse
      opacity="0.5"
      cx="12"
      cy="17"
      rx="7"
      ry="4"
      stroke="#1C274C"
      strokeWidth="1.5"
    />
  </Svg>
);

const BackButton = ({theme, ...props}: any) => (
  <Svg
    fill="#1C274C"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="100px"
    height="100px"
    viewBox="0 0 72 72"
    enableBackground="new 0 0 72 72"
    xmlSpace="preserve"
    {...props}>
    <Path
      fill="#1C274C"
      d="M48.252,69.253c-2.271,0-4.405-0.884-6.011-2.489L17.736,42.258c-1.646-1.645-2.546-3.921-2.479-6.255
      c-0.068-2.337,0.833-4.614,2.479-6.261L42.242,5.236c1.605-1.605,3.739-2.489,6.01-2.489c2.271,0,4.405,0.884,6.01,2.489
      c3.314,3.314,3.314,8.707,0,12.021L35.519,36l18.743,18.742c3.314,3.314,3.314,8.707,0,12.021
      C52.656,68.369,50.522,69.253,48.252,69.253z M48.252,6.747c-1.202,0-2.332,0.468-3.182,1.317L21.038,32.57
      c-0.891,0.893-0.833,2.084-0.833,3.355c0,0.051,0,0.101,0,0.151c0,1.271-0.058,2.461,0.833,3.353l24.269,24.506
      c0.85,0.85,1.862,1.317,3.063,1.317c1.203,0,2.273-0.468,3.123-1.317c1.755-1.755,1.725-4.61-0.03-6.365L31.292,37.414
      c-0.781-0.781-0.788-2.047-0.007-2.828L51.438,14.43c1.754-1.755,1.753-4.61-0.001-6.365C50.587,7.215,49.454,6.747,48.252,6.747z"
    />
  </Svg>
);

const UsersGroupIcon = ({width = 20, height = 20, ...props}: any) => {
  const {theme} = useTheme(); // Get the theme

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}>
      <Circle opacity="0.4" cx="15" cy="6" r="3" fill="#1C274C" />
      <Ellipse
        opacity="0.4"
        cx="16"
        cy="17"
        rx="5"
        ry="3"
        fill="#1C274C"
      />
      <Circle cx="9.00098" cy="6" r="4" fill="#1C274C" />
      <Ellipse
        cx="9.00098"
        cy="17.001"
        rx="7"
        ry="4"
        fill="#1C274C"
      />
    </Svg>
  );
};
const BusIcon = ({ theme, ...props }: any) => {
  return (
    <Svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M4 10C4 6.22876 4 4.34315 5.17157 3.17157C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.17157C20 4.34315 20 6.22876 20 10V12C20 15.7712 20 17.6569 18.8284 18.8284C17.6569 20 15.7712 20 12 20C8.22876 20 6.34315 20 5.17157 18.8284C4 17.6569 4 15.7712 4 12V10Z"
        stroke="#1C274C"
        strokeWidth="1.5"
      />
      <Path
        opacity="0.5"
        d="M4 13H20"
        stroke="#1C274C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.5 16H17"
        stroke="#1C274C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7 16H8.5"
        stroke="#1C274C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity="0.5"
        d="M6 19.5V21C6 21.5523 6.44772 22 7 22H8.5C9.05228 22 9.5 21.5523 9.5 21V20"
        stroke="#1C274C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity="0.5"
        d="M18 19.5V21C18 21.5523 17.5523 22 17 22H15.5C14.9477 22 14.5 21.5523 14.5 21V20"
        stroke="#1C274C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity="0.5"
        d="M20 9H21C21.5523 9 22 9.44772 22 10V11C22 11.3148 21.8518 11.6111 21.6 11.8L20 13"
        stroke="#1C274C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity="0.5"
        d="M4 9H3C2.44772 9 2 9.44772 2 10V11C2 11.3148 2.14819 11.6111 2.4 11.8L4 13"
        stroke="#1C274C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity="0.5"
        d="M19.5 5H4.5"
        stroke="#1C274C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
};
const DeliveryIcon = (props: any) => (
  <Svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M7.50626 15.2647C7.61657 15.6639 8.02965 15.8982 8.4289 15.7879C8.82816 15.6776 9.06241 15.2645 8.9521 14.8652L7.50626 15.2647ZM6.07692 7.27442L6.79984 7.0747V7.0747L6.07692 7.27442ZM4.7037 5.91995L4.50319 6.64265L4.7037 5.91995ZM3.20051 4.72457C2.80138 4.61383 2.38804 4.84762 2.2773 5.24675C2.16656 5.64589 2.40035 6.05923 2.79949 6.16997L3.20051 4.72457ZM20.1886 15.7254C20.5895 15.6213 20.8301 15.2118 20.7259 14.8109C20.6217 14.41 20.2123 14.1695 19.8114 14.2737L20.1886 15.7254ZM10.1978 17.5588C10.5074 18.6795 9.82778 19.8618 8.62389 20.1747L9.00118 21.6265C10.9782 21.1127 12.1863 19.1239 11.6436 17.1594L10.1978 17.5588ZM8.62389 20.1747C7.41216 20.4896 6.19622 19.7863 5.88401 18.6562L4.43817 19.0556C4.97829 21.0107 7.03196 22.1383 9.00118 21.6265L8.62389 20.1747ZM5.88401 18.6562C5.57441 17.5355 6.254 16.3532 7.4579 16.0403L7.08061 14.5885C5.10356 15.1023 3.89544 17.0911 4.43817 19.0556L5.88401 18.6562ZM7.4579 16.0403C8.66962 15.7254 9.88556 16.4287 10.1978 17.5588L11.6436 17.1594C11.1035 15.2043 9.04982 14.0768 7.08061 14.5885L7.4579 16.0403ZM8.9521 14.8652L6.79984 7.0747L5.354 7.47414L7.50626 15.2647L8.9521 14.8652ZM4.90421 5.19725L3.20051 4.72457L2.79949 6.16997L4.50319 6.64265L4.90421 5.19725ZM6.79984 7.0747C6.54671 6.15847 5.8211 5.45164 4.90421 5.19725L4.50319 6.64265C4.92878 6.76073 5.24573 7.08223 5.354 7.47414L6.79984 7.0747ZM11.1093 18.085L20.1886 15.7254L19.8114 14.2737L10.732 16.6332L11.1093 18.085Z"
      fill="#1C274C"
    />
    <Path
      opacity="0.5"
      d="M9.56541 8.73049C9.0804 6.97492 8.8379 6.09714 9.24954 5.40562C9.66119 4.71409 10.5662 4.47889 12.3763 4.00849L14.2962 3.50955C16.1062 3.03915 17.0113 2.80394 17.7242 3.20319C18.4372 3.60244 18.6797 4.48023 19.1647 6.2358L19.6792 8.09786C20.1642 9.85343 20.4067 10.7312 19.995 11.4227C19.5834 12.1143 18.6784 12.3495 16.8683 12.8199L14.9484 13.3188C13.1384 13.7892 12.2333 14.0244 11.5203 13.6252C10.8073 13.2259 10.5648 12.3481 10.0798 10.5926L9.56541 8.73049Z"
      stroke="#1C274C"
      strokeWidth="1.5"
    />
  </Svg>
);

const withDefaultSize = (
  Component: React.FC<any>,
  defaultSize: number = 20,
) => {
  return ({width, height, ...props}: any) => (
    <Component
      width={width ?? defaultSize}
      height={height ?? defaultSize}
      {...props}
    />
  );
};
const UserIconWithDefaultSize = withDefaultSize(UserIcon);
const BackButtonWithDefaultSize = withDefaultSize(BackButton);
const UsersGroupIconWithDefaultSize = withDefaultSize(UsersGroupIcon);
const BusIconIconWithDefaultSize = withDefaultSize(BusIcon);
const DeliveryIconWithDefaultSize = withDefaultSize(DeliveryIcon);
const icons = {
  user: UserIconWithDefaultSize,
  backButton: BackButtonWithDefaultSize,
  usersGroup: UsersGroupIconWithDefaultSize,
  busIcon:BusIconIconWithDefaultSize,
  deliveryIcon:DeliveryIconWithDefaultSize,
  orderIcon:DeliveryIconWithDefaultSize,
};

export default icons;
