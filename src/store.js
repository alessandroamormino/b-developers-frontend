import {reactive} from 'vue';

export const store = reactive({

    URI: 'http://127.0.0.1:8000/',
    APIPath: 'api/developers',

    apiURLsearch: 'http://127.0.0.1:8000/' + 'api/developers' + '?skill_id=',
    selectedSkill: '',

    skillName: '',
})