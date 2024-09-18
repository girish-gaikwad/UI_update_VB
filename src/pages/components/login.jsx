import React from "react";

const LoginPage = () => {
  const loginwithgoogle = () => {
    window.open("http://localhost:8000/auth/google/callback", "_self");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-10 text-center bg-white shadow-md rounded-lg">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-bold">Event Booking</h1>
        </div>

        <p className="text-xl mb-14 text-blue-500">Hi, Welcome Back</p>

        <button
          className="flex items-center justify-center p-2 bg-white border border-gray-300 rounded cursor-pointer mb-5 w-full text-lg text-gray-800 hover:bg-gray-100 active:bg-gray-200"
          onClick={loginwithgoogle}
        >
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAK4SURBVHgBtZbPSxRhGMefZ2ZWDV0ZyUQhYi5Fp9qBFRYqGi2imz/yoKe2W9FBuwSSoXux6JLeA+20kgUKQUHqjjcrK/0LnIQoCnTMX7E77zy9sz90f8y0q25fGHbmefZ5Ps/s87zvuwhF9OtqSCNgbfxWQyKFAOW0y3Aubpu2KqSpprcLhlcO9HL8bG0Oc+8gv1WgNI0znxhxgxVA1q+HlESCjTmVwyFkk3Cvce79iCckDYhB6dW7CA2fP67WTS2ZGYtQbgBjQks2IAfyTwCCjkgt26y6rmH2IzoXMFCB4JaTOBvQpHv0JN3kMRenCUgdJ2YWdfDQdy2koMj6iIkjboA9yJ8X1Ss7b04p1mpNDsBiouoVeBCJ1ozYjsfY7cpza4A8s7XqT3kI7jTGPuhQBkmAQhsQJR+qLv4AsWEXdmMnjeOTy+NQJklEFMg2+M5sgHT69yhMugdoT7YCogVPoUQRkCnxz0C+A4GWvIIkRrJNqEHJQlOA/y/ZgZj5VkRBhjJK4IusAEJkB6BsQkPiG9o874GSMX1O1MPAZvAywGvXkJl+vw4eu3fr8FYf73TOUPCXMAR+HoxnDM92zsLdjQuwbldqwYnOPji4egssRMtIMZC/xmtXhrdU2XmL/RLAlGyfutAzYUAJan20Pcj3+aF8u+0DVcAWMLvWr0VyAMkKQGaYiDVHO8NF8sOVxzu9bgC+g+j6/Zqlvd82OHHjC7ismeSX+alnI0z7K5iud0wlByUU7VbiENf45NwUrHqt+ls/oJVbqAigvnuQBQlF2xWGYowOeZ5wEFSutYNv81LKYFNk7qF/KF3kvo4KcuSAqtbans8O1IYztoJRPCqIx41+6n6VM5me/1aSDUccLB2GOidEFnte6gWeYqHBaJfGF2uYEM9DatHK6YoNdI5egnn+qLslz+gvWlEbVtdxWJYAAAAASUVORK5CYII="
            alt="Google Logo"
            className="w-5 h-5 mr-2"
          />
          Sign in with Google
        </button>

        <p className="text-sm text-gray-500">
          Sign In with your BIT Sathy Account
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
