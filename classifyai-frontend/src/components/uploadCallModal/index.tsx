import "./index.scss";
import { useState, useEffect } from "react";
import Input from "../input";
import SelectTag from "../selectTag";
import UploadIcon from "../../assets/images/upload.svg";
import { ActionMeta, SingleValue } from "react-select";
import { useGetAllOperators } from "../../query/operators/useOperators";
import { UserDetails } from "../../routes/UserInterface";
import { useAddCall } from "../../query/calls/useCalls";
import LoadingSpinner from "../loadingSpinner";
import Button from "../button";
import { mapOperatorsData } from "../../helpers/callUploadHelpers";
import { UploadCallModalProps, MyOptionType } from "./UploadCallProps";

const UploadCallModal = ({ onClose }: UploadCallModalProps) => {
    const [operators, setOperators] = useState<UserDetails[]>([]);
    const { data: allOperators, isSuccess: allOperatorsSuccess } = useGetAllOperators();
    const [options, setOptions] = useState<MyOptionType[]>([]);
    const [customerNbr, setCustomerNbr] = useState<string>('');
    const [selectedOperator, setSelectedOperator] = useState<any>();
    const [audioBase64, setAudioBase64] = useState<string>("");
    const { mutateAsync, isLoading: callStillUploading, isSuccess: callUploadSuccess } = useAddCall();

    useEffect(() => {
        if (allOperatorsSuccess) {
            setOperators(allOperators.data);
        }
        setOptions(mapOperatorsData(operators));
    }, [allOperators])

    const handleSelectionChange = (
        newSelections: SingleValue<MyOptionType>,
        actionMeta: ActionMeta<MyOptionType>
    ) => {
        setSelectedOperator(newSelections?.key);
    };

    const convertAudioToBase64 = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        const audio_file: File = (target.files as FileList)[0];
        let reader = new FileReader();
        reader.readAsDataURL(audio_file);

        reader.onload = (e) => {
            let audio_base64: any = e.target?.result;
            setAudioBase64(audio_base64);
        }
    }

    const handleCallUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        let bodyFormData = new FormData();
        bodyFormData.append("cutomer_nbr", customerNbr);
        bodyFormData.append("operator_id", selectedOperator);
        bodyFormData.append("base64_audio", audioBase64);
        try {
            await mutateAsync(bodyFormData);
        } catch (err) {
            console.log(err);
        }
    }

    if (callUploadSuccess) {
        setTimeout(onClose
            , 5000);
    }

    return (
        <div className='callmodal__container'>
            <form onSubmit={handleCallUpload} className="callmodal__form">
                <SelectTag
                    options={options}
                    onChange={handleSelectionChange}
                />
                <Input
                    type={"text"}
                    label={"Customer Number"}
                    defaultValue={""}
                    name={"customerNumber"}
                    onChange={(e) => {
                        setCustomerNbr(e.target.value);
                    }}
                />

                <div className='upload__call'>
                    <label htmlFor="uploadcall">
                        <img className="image" src={UploadIcon} alt="upload" />
                    </label>
                    <input onChange={convertAudioToBase64}
                        type="file"
                        id="uploadcall"
                        name="uploadcall"
                        accept=".mp3"
                    />
                </div>

                <Button
                    text={"Submit"}
                    classNames={["button--green", "button--fixedwidth"]}
                    disabled={callStillUploading}
                />

                {callStillUploading &&
                    <LoadingSpinner
                        topMsg={"Processing the audio file"}
                        bottomMsg={"This might take a while depending on the audio size."}
                        loading={true}
                    />
                }

                {callUploadSuccess &&
                    <LoadingSpinner
                        successMsgTop={"Call uploaded successfully"}
                        successMsgBottom={"This modal will close by itself in 5 seconds"}
                        success={true}
                    />
                }
            </form>


        </div>
    )
}

export default UploadCallModal;