import { FaUserPlus, FaSistrix } from 'react-icons/fa6';
import { MdGroupAdd } from 'react-icons/md';
import './convList.scss'
import { useTranslation } from 'react-i18next';

function ConvList() {
    const { t } = useTranslation();

    const handleChangeSearch = () => {

    }

    return (<>
        <div className="conv-list">
            <div className="contact-search">
                <div className="contact-search__group">
                    <span><FaSistrix /></span>
                    <input
                        type="text"
                        className="form__input"
                        placeholder={t("messages.search_placeholder")}
                    />
                </div>
                <div className='tooltip' onClick={() => alert('add friends')}>
                    <FaUserPlus className='contact-search__icon' />
                    <span className='tooltip__text'>{t("messages.add_friend")}</span>
                </div>

                <div className='tooltip' onClick={() => alert('create group')}>
                    <MdGroupAdd className='contact-search__icon' />
                    <span className='tooltip__text'>{t("messages.create_group_chat")}</span>
                </div>
            </div>
        </div>
    </>)
}

export default ConvList;