import "./index.scss";
import DummyPP from "../../assets/images/dummy__pp.svg";
import { TableRowUserInfoProps } from "./TableRowUserProps";
import Config from "../../constants/config.json";

const TableRowUserInfo = ({ ppPath, firstName, lastName, username, id }: TableRowUserInfoProps) => {

    return (
        <div className='user__container'>
            <div className="user__info">
                {ppPath ?
                    <img src={`${Config.BASE_URL_PP}/${id}/${ppPath}`} className="user__pp" alt="pp" />
                    :
                    <img src={DummyPP} className="user__pp" alt="pp" />}
                <div className="user__info--right">
                    <p className='name'>{`${firstName} ${lastName}`}</p>
                    <p className='username'>{`@${username}`}</p>
                </div>
            </div>
        </div>
    )
}

export default TableRowUserInfo;

