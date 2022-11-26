import React, { useState, useEffect } from 'react';
import "./index.scss"
import Footer from '../../components/footer';
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';
import TitleComponent from '../../components/titleBar';
import DashboardHOC from '../../hoc/dashboardHOC/DashboardHOC';
import UploadIcon from "../../assets/images/upload.svg";
import Button from '../../components/button';
import { useUploadScript } from "../../query/scripts/useScripts";
import ScriptUploadDataModal from '../../components/fullPageScripModal';
import { DataToDisplay } from "./ScriptData";

const Scripts = () => {

    const [csvToSend, setCsvToSend] = useState<any>();
    const { mutateAsync, isLoading: scriptStillUploading, isSuccess: scriptUploadSuccess } = useUploadScript();
    const [dataToDisplay, setDataToDisplay] = useState<DataToDisplay>();
    const [openModal, setOpenModal] = useState(true)

    const convertCSVFile = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        const csv_file: File = (target.files as FileList)[0];
        let reader = new FileReader();
        reader.readAsDataURL(csv_file);

        reader.onload = (e) => {
            let csv_base64: any = e.target?.result;
            setCsvToSend(csv_base64.split(',')[1]);
        }
    }

    const handleSubmitScript = async (e: React.FormEvent) => {
        e.preventDefault();
        let bodyFormData = new FormData();
        bodyFormData.append("script_base64", csvToSend);
        const res = await mutateAsync(bodyFormData);
        setDataToDisplay(res.data);
    }

    useEffect(() => {
        setOpenModal(true);
    }, [dataToDisplay])

    return (
        <DashboardHOC>
            <Sidebar />
            <Header />
            <div>
                <TitleComponent
                    title={"Upload Script"}
                />

                <form className='script__upload' onSubmit={handleSubmitScript}>

                    <label htmlFor="file">
                        <img src={UploadIcon} alt="Upload Icon" />
                    </label>

                    <input
                        type="file"
                        name="file"
                        id="file"
                        className="inputfile"
                        accept='.csv'
                        onChange={convertCSVFile}
                    />

                    <p>Upload a csv File of the following format</p>
                    <a href="/templates/call_upload_template.csv" download>
                        <p>Download Template</p>
                    </a>

                    <Button
                        text={"upload"}
                        classNames={["button--red", "button--fixedwidth"]}
                    />
                </form>

                {scriptUploadSuccess && dataToDisplay && openModal &&
                    <ScriptUploadDataModal
                        customerPcts={[
                            dataToDisplay.customer_sentiments_avg.POSITIVE,
                            dataToDisplay.customer_sentiments_avg.NEGATIVE,
                            dataToDisplay.customer_sentiments_avg.NEUTRAL
                        ]}
                        operatorPcts={[
                            dataToDisplay.operator_sentiments_avg.POSITIVE,
                            dataToDisplay.operator_sentiments_avg.NEGATIVE,
                            dataToDisplay.operator_sentiments_avg.NEUTRAL
                        ]}
                        customerConfidenceAvg={dataToDisplay.customer_confidence}
                        operatorConfidenceAvg={dataToDisplay.operator_confidence}
                        customerTotalSentencesNbr={dataToDisplay.customer_sentences_number}
                        operatorTotalSentencesNbr={dataToDisplay.operator_sentences_number}
                        onClick={() => setOpenModal(false)}
                    />}

            </div>
            <Footer />
        </DashboardHOC>
    )
}

export default Scripts;