import React from 'react'
import { Input } from '../../../../Element/input'
import Textarea from '../../../../Element/textarea'

interface Props {
    
}

const SecretRecoveryPhraseStage = (props: Props) => {
    return (
        <div className='p-4 space-y-5'>
            <p>Secret recovery phrase backup</p>
            <Textarea className='h-32' />
            <p>Encryption Password</p>
            <Input placeholder='Encryption Password' />
        </div>
    )
}

export default SecretRecoveryPhraseStage
