interface IImages {
  images: {
    frontImage: File
    backImage: File
    profileImage: File
  }
}

const ShowUploadedNID = ({images}:IImages) => {
  return (
    <div className="flex justify-center gap-12">
      <div>
        <img src={URL.createObjectURL(images?.frontImage)} alt="nid front side" className="h-44" />
        <p className="text-center mt-4">NRC Front Side</p>
      </div>
      <div>
        <img src={URL.createObjectURL(images?.backImage)} alt="nid back side" className="h-44" />
        <p className="text-center mt-4">NRC Back Side</p>
      </div>
      <div>
        <img src={URL.createObjectURL(images?.profileImage)} alt="profile picture" className="h-44" />
        <p className="text-center mt-4">Profile Picture</p>
      </div>
    </div>
  );
};

export default ShowUploadedNID;
