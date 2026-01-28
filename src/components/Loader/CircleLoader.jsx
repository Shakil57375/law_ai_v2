import { CircleLoader } from 'react-spinners';
const WholeWebsiteCircleLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <CircleLoader color="#36d7b7" size={150} />
      </div>
    </div>
  );
};

export default WholeWebsiteCircleLoader;
