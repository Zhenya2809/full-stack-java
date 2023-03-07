import UInput from './UInput.vue';
import UFile from "@/components/global/UFile.vue";
import UCheckBox from "@/components/global/UCheckBox.vue";
import URadio from "@/components/global/URadio.vue";
import UModal from "@/components/global/UModal.vue";
import ReviewForm from "@/components/global/ReviewForm.vue";
import UButton from "@/components/global/UButton.vue";

const components = [
    {name: 'UInput', component: UInput},
    {name: 'UFile', component: UFile},
    {name: 'UCheckBox', component: UCheckBox},
    {name: 'URadio', component: URadio},
    {name: 'UModal', component: UModal},
    {name: 'ReviewForm', component: ReviewForm},
    {name: 'UButton', component: UButton},
]
export default {
    install(app) {
        components.forEach(({name, component}) => {
            app.component(name, component)
        })
    }
}