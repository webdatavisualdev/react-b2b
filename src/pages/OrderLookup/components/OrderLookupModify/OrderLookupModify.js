import React, {useEffect} from 'react'

import Button from 'components/Button/Button';
import styles from './OrderLookupModify.module.scss'
import {ReactComponent as EmailIcon} from 'icons/Email.svg'
import {ReactComponent as PhoneIcon} from 'icons/Phone.svg'
import {ReactComponent as ChatIcon} from 'icons/Chat.svg'

export default function OrderLookupModify() {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://static.zdassets.com/ekr/snippet.js?key=b317fc70-2e69-4a1c-b857-378ab9828ae5";
    script.async = true;
    script.id = "ze-snippet";
  
    document.body.appendChild(script)
  }, [])

  return (
    <div className={styles.main}>
      <div className={styles.topText}>Modify Your Order</div>
      <div className={styles.description}>
        Would you like to modify your order? Just email, call, or start a live chat with us!
      </div>
      <div className={styles.orderRow}>
        <div className={styles.eachItem}>
          <div className={styles.iconWrapper}>
            <EmailIcon className={styles.icon}/>
          </div>
          <Button onClick={() => {
            const url = 'mailto:support@simplenight.zendesk.com';
            window.location.href = url
          }}>Email Support</Button>
          <div className={styles.borderRight} />
        </div>
        <div className={styles.eachItem}>
          <div className={styles.iconWrapper}>
            <PhoneIcon className={styles.icon}/>
          </div>
          <div className={styles.phoneText}>1 (844) 674-6759</div>
          <div className={styles.borderRight} />
        </div>
        <div className={styles.eachItem}>
          <div className={styles.iconWrapper}>
            <ChatIcon className={styles.icon}/>
          </div>
          <Button>Start Chat</Button>
        </div>
      </div>
    </div>
  )
}