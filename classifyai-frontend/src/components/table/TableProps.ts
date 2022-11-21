import { UserDetails } from '../../routes/UserInterface'
import { CallDetails } from '../callRow/CallDetails';

export interface TableProps {
    headers: Array<string>;
    rowsData?: Array<UserDetails>;
    callData?: Array<CallDetails>;
    calls?: Array<string>;
    setCurrentSong?: Function;
    setIsPlaying?: Function;
    singleOperator?: boolean;
    supervisor?: boolean;
    isSuperSupervisor?: boolean
}