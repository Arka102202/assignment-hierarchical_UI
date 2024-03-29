import logo from "../../../assets/switch-head.png"
import ConfirmationBox from '../../confirmationBox/ConfirmationBox';
import { switchHead } from '../../../utils/mimic API calls/employee';

const SwitchHead = ({ curHead = {}, futureHead = {}, teamId = "", deptId = "", setRefetch = () => { }, setRefetchTeam = () => { } }) => {

  return (
    <>
      <button title='switch head' className='emp-btn' onClick={(e) => {
        e.stopPropagation();
        ConfirmationBox(() => {
          switchHead(curHead, futureHead, deptId, teamId, "teamId");
          setRefetch(state => !state);
          setRefetchTeam(state => !state);
        }, undefined, undefined, "Switched SuccessFully!!", `Now ${futureHead.name} is new head`, undefined, `${curHead.name} will remain the head...`, "yeas, Switch!", undefined);
      }}>
        <img src={logo} alt="switching person logo" />
      </button>
    </>
  );
};

export default SwitchHead;