<template>
  <div class="min-h-screen flex items-center justify-center" style="background-color: #434b4d;">

    <div class="w-full flex flex-col main-cont"> 

      <div style="padding: 10px; display: flex;">
        <div class="flex items-center" style="font-size: 12px; ">
          <span>Добавить учетную запись</span>
        </div>
        <div @click="store.addNewAccount" class="button-add"><span>+</span></div>
      </div>
      
      <div class="flex items-center" style="padding-left: 10px">
        <img :src="question" alt="question" class="question-icon"/>
        <span>Для добавления нескольких меток для одной пары логин/пароль используйте разделитель ;</span>
      </div>
      
      <div class="grid grid-cols-[25%_20%_27%_25%_3%] gap-px text-sm tbl-body">
        
        <div class="bg-white font-bold p-4 tbl-header">Метки</div>
        <div class="bg-white font-bold p-4 tbl-header">Тип записи</div>
        <div class="bg-white font-bold p-4 tbl-header">Логин</div>
        <div class="bg-white font-bold p-4 tbl-header">Пароль</div>
        <div></div>

         <template v-for="(acc, index) in store.accounts">
          
          <div class="bg-white p-2 tbl-row">
            <input type="text" maxlength="50" v-model="store.tagString(acc).value"/>
          </div>
          
          <div class="bg-white p-2 tbl-row">
            <select v-model="acc.AccountType" class="custom-select">
              <option value="" disabled selected>Выберите значение</option>
              <option value="1">LDAP</option>
              <option value="2">Локальная</option>
            </select>
          </div>
          
          <div :ref="el => store.loginRefs[index] = el"
                :class="{'col-span-2': acc.AccountType == 1}" 
                class="bg-white p-2 tbl-row">

            <input type="text" maxlength="100" 
                    v-model="acc.Login" 
                    @blur="() => { store.validateInput(acc.Login, store.loginRefs[index]) }"/>
          </div>
          
          <div v-show="acc.AccountType != 1" 
                :ref="el => store.passwordRefs[index] = el" 
                class="bg-white p-2 tbl-row">

            <input :type="acc.ShowPassword ? 'text' : 'password'" 
                    maxlength="100" 
                    v-model="acc.Password"
                    @blur="() => { store.validateInput(acc.Password, store.passwordRefs[index]) }"/>

            <span class="hidepass-icon" @click="()=>{acc.ShowPassword = !acc.ShowPassword}">
              <img v-if="!acc.ShowPassword" :src="eye" alt="eye" />
              <img v-else :src="eyeoff" alt="eyeoff"/>
            </span>
          </div>
          
          <div class="flex items-center justify-center mr-[5px]">
              <img :src="trash" alt="trash" class="trash-icon" @click="store.deleteAccount(acc)" />
          </div>
        </template>

      </div>
    </div>
   
  </div>
</template>
<script lang="ts" setup>

import { useAccountsStore } from '@/stores/accounts'

import eye from '@/assets/icons/eye.svg'
import eyeoff from '@/assets/icons/eyeoff.svg'
import trash from '@/assets/icons/trash.svg'
import question from '@/assets/icons/question.svg'

const store = useAccountsStore()

function validateInput(value: string, refEl: Ref<HTMLInputElement | null>) {
  const empty = value.trim() === ''

  if (refEl.value) {
    refEl.value.classList.toggle('field-empty', empty)
  }
}

</script>

<style>

.main-cont{
    border: 1px white solid;
    border-radius: 3px;
    overflow: auto; 
    background-color: #212121;
    margin: 20px;
    height: 500px;
    font-size:12px;
    color:white;
}

.button-add{
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px #ffffff solid;
    border-radius: 3px;
    margin-left: 5px;
    font-size: 20px;
    font-weight: 600;
    color: white;
    cursor: pointer;
    background-color: #434b4d;
}

.button-add:hover{
  opacity: 0.5;
}

.tbl-body{
  margin:10px; 
  padding: 5px;
  border: 1px white solid;
  border-radius: 3px;
}

.tbl-header{
  padding: 5px;
}

.tbl-row{
  border: 1px white solid;
  border-radius: 3px;
  margin: 4px;
  height: 20px;
  position: relative;
}

.tbl-row input{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    font-size: 10px;
    color: white;
    background-color: #434b4d;
    border: none;
    outline: none;
    border-radius: 4px;
}

.hidepass-icon{
  position: absolute;
  right: 3px;
  top: 3px;
  cursor: pointer;
  filter: invert(100%) brightness(100%);
}

.hidepass-icon img{
    width: 14px;
    height: 14px;
}

.trash-icon{
  width: 14px;
  height: 14px;  
  filter: invert(100%) brightness(100%);
  cursor: pointer;
}

.question-icon{
  margin-right: 5px;
  width: 14px;
  height: 14px;  
  filter: invert(100%) brightness(100%);
}

.custom-select {
  width: 100%;
  font-size: 10px;
  color: white;
  background-color: #434b4d;
  padding: 4px 8px;
  border: none;
  outline: none;
  appearance: none; /* убирает стрелку браузера по умолчанию */
  background-image: url("data:image/svg+xml;utf8,<svg fill='white' height='14' viewBox='0 0 24 24' width='14' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 1px center;
  border-radius: 4px;
  cursor: pointer;
}

.field-empty{
  border-color:red !important;
}


</style>