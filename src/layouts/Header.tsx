import { useNavigate, Link } from "react-router-dom";
import { Dropdown, List, Button, Card } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import { FaUser } from "react-icons/fa";
import Cookies from "js-cookie";
import { humanize } from "@/lib/helpers";
import { useAppSelector } from "@/app";
import { ProfileBadge, CustomAvatar } from "@/components/common";
import { deleteData } from "@/lib/services";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const email = Cookies.get("email" || "");
  const name = Cookies.get("name" || "");
  const imgUrl = Cookies.get("img" || "");
  const { global } = useAppSelector((state) => state);

  const handleLogout = async () => {
    const res = await deleteData("users/logout");
    if (res.success) {
      toast.success(res.message);
      Cookies.remove("token");
      Cookies.remove("email");
      Cookies.remove("expires");
      Cookies.remove("name");
      Cookies.remove("role");
      Cookies.remove("permission_codes");
      Cookies.remove("img");
      Cookies.remove("s_g");
      navigate("/login", { replace: true });
    } else {
      toast.error(res.message);
    }
  };

  const userMenu = (
    <List
      dataSource={[1]}
      className=" rounded"
      renderItem={(item) => (
        <Card className="min-w-[15rem] shadow">
          <List.Item>
            <div className="flex flex-col items-center w-full mb-1">
              <div className="relative">
                {
                  <CustomAvatar
                    data={{
                      img: imgUrl ? imgUrl : "",
                      name: name ? name : "",
                    }}
                    size={100}
                    border={2}
                  />
                }

                <div className="absolute bottom-1.5 right-1.5">
                  <ProfileBadge />
                </div>
              </div>
              <h2 className="uppercase  font-medium text-sky-700 text-center pt-2">
                {name}
              </h2>
              <p className="text-gray-500">{email}</p>
            </div>
          </List.Item>
          <List.Item>
            <Link
              to="/profile/details"
              className="flex gap-6 hover:font-medium text-gray-600 hover:text-sky-600 hover:bg-gray-50 pr-4 py-1 rounded-sm"
            >
              <FaUser className="relative top-1 left-4 " size={13} />
              <span>Profile</span>
            </Link>
          </List.Item>
          <List.Item>
            <Button
              type="text"
              icon={<PoweroffOutlined className="relative -top-0.5" />}
              ghost
              onClick={handleLogout}
              className="hover:text-red-500 hover:font-medium"
            >
              Logout
            </Button>
          </List.Item>
        </Card>
      )}
    />
  );

  return (
    <div className="flex justify-between items-baseline">
      <div className="hidden lg:block mt-2 text-gray-500 text-xs uppercase">
        {humanize(global?.seletedPage.replace(/-/g, " "))}
      </div>
      <div className="ml-auto flex mt-4 gap-6 items-center">
        <div></div>
        <Dropdown overlay={userMenu}>
          <div>
            {
              <CustomAvatar
                data={{
                  img: imgUrl ? imgUrl : "",
                  name: name ? name : "",
                }}
                size={35}
                border={1}
                textSize={12}
              />
            }
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
