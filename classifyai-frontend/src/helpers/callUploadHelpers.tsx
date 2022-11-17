import { UserDetails } from "../routes/UserInterface"
import DummyPP from "../assets/images/dummy__pp.svg"
import { BASE_URL_PP } from "../constants/urls"
import { MyOptionType } from "../components/uploadCallModal/UploadCallProps"

export const mapOperatorsData = (operators: UserDetails[]) => {
    const toReturn: MyOptionType[] = []
    for (let i = 0; i < operators.length; i++) {
        toReturn.push({
            key: operators[i].id,
            value: operators[i].username,
            label:
                <div className="imglabel">
                    {
                        operators[i].profile_pic_url ?
                            <img src={`${BASE_URL_PP}/${operators[i].id}/${operators[i].profile_pic_url}`} height="40px" width="40px" alt="pp" />
                            :
                            <img src={DummyPP} height="40px" width="40px" alt="pp" />}
                    {`@${operators[i].username}`}
                </div>,
        });
    }

    return toReturn;
}