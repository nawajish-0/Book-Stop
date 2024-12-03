import { RxCross1 } from "react-icons/rx";

const SeeUserData = ({ userDivData, userDiv, setuserDiv }) => {
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div className={`${userDiv} top-0 left-0 h-screen w-full bg-black opacity-70 fixed z-50`} />
      <div
        className={`${userDiv} top-0 left-0 h-screen w-full flex items-center justify-center fixed z-50`}
      >
        <div className="bg-gray-900 rounded-lg p-6 w-[90%] md:w-[60%] lg:w-[40%] text-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">User Information</h1>
            <button onClick={() => setuserDiv("hidden")} className="text-gray-400 hover:text-white transition-colors duration-300">
              <RxCross1 className="text-2xl" />
            </button>
          </div>
          <div className="mt-4">
            <label className="font-medium">Username: </label>
            <span className="font-semibold">{userDivData.user.username}</span>
          </div>
          <div className="mt-4">
            <label className="font-medium">Email: </label>
            <span className="font-semibold">{userDivData.user.email}</span>
          </div>
          <div className="mt-4">
            <label className="font-medium">Address: </label>
            <span className="font-semibold">{userDivData.user.address}</span>
          </div>
          <div className="mt-4">
            <label className="font-medium">Order Placed On: </label>
            <span className="font-semibold">{formatDate(userDivData.orderCreatedAt)}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeeUserData;
