import { defineStore } from 'pinia'
import { ref, watch  } from 'vue'
import { computed } from 'vue'


class Tag {
  text: string = ''
}

class Account {
  Tags: Tag[] = []
  AccountType: number = 0
  Login: string = ''
  Password: string | null = null
  ShowPassword: boolean = false
}

export const useAccountsStore = defineStore('accounts', () => {
  
    const localStorageKey = 'accounts-storage'
    const stored = localStorage.getItem(localStorageKey)

    const accounts = ref<Account[]>(stored ? JSON.parse(stored) : [])
    const loginRefs = ref<(HTMLInputElement | null)[]>([])
    const passwordRefs = ref<(HTMLInputElement | null)[]>([])
  
    function addNewAccount() {
        accounts.value.push(new Account())
    }

    function deleteAccount(item:Account) {
        accounts.value.splice(accounts.value.indexOf(item), 1);
    }

    function validateInput(value: string, inputEl: HTMLInputElement | null) {
        
        const isEmpty = value == null || value.trim() === ''
        if (inputEl) {
            inputEl.classList.toggle('field-empty', isEmpty)
        }
    }

    function tagString(acc: Account) {
        return computed({
            get() {
            return acc.Tags.map(t => t.text).join('; ')
            },
            set(value: string) {
            acc.Tags = value
                .split(';')
                .map(s => s.trim())
                .filter(s => s !== '')
                .map(s => ({ text: s }))
            }
        })
    }

    watch(accounts, (newVal) => {
        localStorage.setItem(localStorageKey, JSON.stringify(newVal))
    }, { deep: true })

    return { accounts, loginRefs, passwordRefs, addNewAccount, deleteAccount, validateInput, tagString }
})