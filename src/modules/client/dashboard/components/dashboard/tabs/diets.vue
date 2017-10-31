<template>

   	<div v-if="currentClient.id">

   		<div class="container">
            <div class="text-center">
                <img class="img-icon" src="../../../../../../assets/icons/diet.png" alt="">
                <h4 class="f-300">Dietas</h4>
            </div>

            <div class="row">
                <div class="col-sm-12" v-if="checkPermission('diets_edit')">
                    <button type="button" class="btn f-20 btn-light btn-block f-300" name="button" @click="interactions.addDiet = !interactions.addDiet">
                        <span v-if="interactions.addDiet"><i class="ion-ios-minus-outline m-r-5"></i>Ocultar formulário</span>
                        <span v-if="!interactions.addDiet"><i class="ion-ios-plus-outline m-r-5"></i>Nova dieta</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- NEW DIET FORM -->
        <div class="container m-t-20" v-if="interactions.addDiet">

            <div class="card">
                <div class="card-header ch-alt text-center">
                    <h4 class="f-300">Nova dieta</h4>
                </div>

                <div class="card-body card-padding">

                    <div class="form-group">
                        <label>Observações sobre esta dieta</label>
                        <textarea
                            type="text"
                            class="form-control"
                            v-model="newDiet.observation"
                            placeholder="Observações sobre esta dieta"
                        ></textarea>
                    </div>

                    <hr>

                    <fieldset class="m-t-20">
                        <legend>Nova refeição</legend>
                        <small class="f-300">Insira uma nova refeição.</small>

                        <div class="row m-t-10">
                            <div class="col-md-12 col-xs-12">
                                <div :class="{'form-group': true, 'has-error': errors.has('type')}">
                                    <label class="full">
                                        <span>Tipo de refeição <small>(obrigatório)</small></span>
                                        <multiselect
                                            v-model="selectedMealType"
                                                     track-by="slug"
                                                     label="name"
                                                     placeholder="Selecione um tipo de refeição"
                                                     :options="meal_types"
                                                     :searchable="false"
                                                     @input="setMealType"
                                                     selectLabel="Enter ou clique para selecionar"
                                                     deselectLabel="Enter ou clique para desselecionar"
                                                     selectedLabel="Selecionado"
                                        ></multiselect>

                                        <small class="f-300 f-danger">{{ errors.first('type') }}</small>
                                    </label>
                                </div>
                            </div>

                            <div class="col-md-12 col-xs-12">
                                <div :class="{'form-group': true, 'has-error': errors.has('time')}">
                                    <label class="full">
                                        <span>Horário <small>(obrigatório)</small></span>
                                        <input
                                            type="time"
                                            v-validate="'required'"
                                            class="form-control"
                                            v-model="newMeal.hour"
                                            placeholder="08:00"
                                            data-vv-name="time" data-vv-as="Horário"
                                        >
                                        <small class="f-300 f-danger">{{ errors.first('time') }}</small>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12 col-xs-12">
                                <button class="btn btn-info btn-sm btn-block" @click="interactions.showMealInfo = !interactions.showMealInfo">{{!interactions.showMealInfo ? 'Mostrar' : 'Esconder'}} informações nutricionais</button>
                            </div>
                        </div>

                        <div class="row m-t-10" v-if="interactions.showMealInfo">

                            <div class="col-md-6 col-xs-6">
                                <div class="form-group">
                                    <label class="full">
                                        <span>Qtde de proteínas</span>
                                        <input
                                            type="number"
                                            class="form-control"
                                            v-model="newMeal.protein"
                                            placeholder="Exemplo: 30"
                                            data-mask="000.00"
                                            data-reverse="true"
                                        >
                                    </label>
                                </div>
                            </div>

                            <div class="col-md-6 col-xs-6">
                                <div class="form-group">
                                    <label class="full">
                                        <span>Qtde de carboidratos</span>
                                        <input
                                            type="number"
                                            class="form-control"
                                            v-model="newMeal.carb"
                                            placeholder="Exemplo: 30"
                                            data-mask="000.00"
                                            data-reverse="true"
                                        >
                                    </label>
                                </div>
                            </div>

                            <div class="col-md-6 col-xs-6">
                                <div class="form-group">
                                    <label class="full">
                                        <span>Qtde de lipídios</span>
                                        <input
                                            type="number"
                                            class="form-control"
                                            v-model="newMeal.fat"
                                            placeholder="Exemplo: 30"
                                            data-mask="000.00"
                                            data-reverse="true"
                                        >
                                    </label>
                                </div>
                            </div>

                            <div class="col-md-6 col-xs-6">
                                <div class="form-group">
                                    <label class="full">
                                        <span>Qtde de fibras</span>
                                        <input
                                            type="number"
                                            class="form-control"
                                            v-model="newMeal.fiber"
                                            placeholder="Exemplo: 30"
                                            data-mask="000.00"
                                            data-reverse="true"
                                        >
                                    </label>
                                </div>
                            </div>

                            <div class="col-md-6 col-xs-6">
                                <div class="form-group">
                                    <label class="full">
                                        <span>Qtde de calorias</span>
                                        <input
                                            type="number"
                                            class="form-control"
                                            v-model="newMeal.kcal"
                                            placeholder="Exemplo: 300"
                                            data-mask="000.00"
                                            data-reverse="true"
                                        >
                                    </label>
                                </div>
                            </div>

                        </div>
                    </fieldset>

                    <hr>

                    <fieldset class="m-t-20">
                        <legend>Opções da refeição: {{newMeal.type}}</legend>
                        <small class="f-300">Você pode inserir uma ou mais opções à esta refeição.</small>

                        <p class="m-t-10" v-show="!newMeal.options.length">Não há opções adicionados à esta refeição.</p>

                        <table class="table table-bordered table-vmiddle" v-show="newMeal.options.length">
                            <thead>
                                <tr>
                                    <th>Opção</th>
                                    <th>Excluir</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(option, indexOption) in newMeal.options">
                                    <td>
                                        <span class="label label-info m-r-5 m-b-5 f-12 p-5" v-for="(item, indexItem) in option.items">{{item}}</span>
                                    </td>
                                    <td class="text-center" width="5%">
                                        <button class="btn btn-danger btn-xs" @click="newMeal.options.splice(indexOption,1)">X</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <button class="btn btn-info btn-xs" data-toggle="modal" data-target="#modal-add-option">Adicionar opção à refeição</button>

                    </fieldset>

                    <hr class="full">

                    <button class="btn btn-info btn-sm btn-block" @click="addMealToDiet()" :disabled="!newMeal.options.length || !newMeal.type || !newMeal.hour">Adicionar refeição à dieta</button>

                    <br>
                    <p class="full">Veja abaixo sua dieta</p>

                </div>
            </div>

        </div>

        <!-- NEW DIET ADDED -->
        <div class="container" v-if="interactions.addDiet">
            <div class="row">
                <div class="col-sm-12">
                    <div class="m-t-10">
                        <!-- Card -->
                        <div class="card">
                            <!-- Card Header -->
                            <div class="card-header ch-alt cursor-pointer text-center" @click="interactions.showCardContent = !interactions.showCardContent">
                                <h4>Nova dieta</h4>
                                <p>Resumo</p>

                            </div>

                            <!-- Card Body -->
                            <div class="card-body card-padding">

                                <div class="full text-center m-t-10 m-b-20">
                                    <h4 class="f-300">Observações</h4>
                                    <span class="f-300 f-info" v-if="newDiet.observation">{{newDiet.observation}}</span>
                                    <span class="f-300 f-info" v-if="!newDiet.observation">Esta dieta não possui observações.</span>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-md-12 col-xs-12 text-center">
                                        <h4 class="f-300">Macro nutrientes por dia</h4>
                                        <span class="label label-success f-400 f-16 m-r-5 p-5 m-b-5">kcal: {{newDiet.daily_total_kcal}}</span>
                                        <span class="label label-success f-400 f-16 m-r-5 p-5 m-b-5">Proteína: {{newDiet.daily_total_protein}} g</span>
                                        <span class="label label-success f-400 f-16 m-r-5 p-5 m-b-5">Carboidrato: {{newDiet.daily_total_carb}} g</span>
                                        <span class="label label-success f-400 f-16 m-r-5 p-5 m-b-5">Lipídios: {{newDiet.daily_total_fat}} g</span>
                                        <span class="label label-success f-400 f-16 m-r-5 p-5 m-b-5">Fibra: {{newDiet.daily_total_fiber}} g</span>
                                    </div>
                                </div>
                                <hr>
                                <h4 class="f-300 text-center m-t-20">Refeições</h4>
                                <p class="text-center f-300 f-danger" v-show="!newDiet.meals.length">Adicione uma ou mais refeições à esta dieta</p>
                                <!-- <hr v-if="newDiet.meals.length"> -->

                                <!-- Diet Time Line -->
                                <div class="line" v-if="newDiet.meals.length">
                                    <div class="line-border"></div>
                                    <div class="line-item m-b-20" v-for="(meal, indexMeal) in newDiet.meals">
                                        <span class="line-date f-400 label label-info f-14"><i class="ion-android-time"></i> {{ meal.hour }}</span>
                                        <i class="line-icon success"></i>

                                        <h3 class="f-300">
                                            {{ meal.type }}
                                            <button class="btn btn-xs btn-danger" @click="removeMeal(newDiet.meals, indexMeal)">
                                                <i class="ion-android-close "></i>
                                            </button>
                                        </h3>

                                        <div class="line-item-group">

                                            <div v-for="(option, indexOptions) in meal.options">
                                                <div class="d-block">
                                                    <h4 class="f-300" v-for="(item, indexItemOption) in option.items">
                                                        <span class="label label-info f-400 p-5 m-r-5 m-b-5" >
                                                            {{ item }}
                                                        </span>
                                                        <button class="btn btn-xs btn-danger" @click="removeItem(option.items, indexItemOption, meal.options, indexOptions)">
                                                            <i class="ion-android-close"></i>
                                                        </button>
                                                    </h4>
                                                    <span v-show="indexOptions != meal.options.length-1">ou</span>
                                                </div>
                                            </div>

                                            <div class="m-b-10 text-center" v-show="interactions.dietsInfoOpened.indexOf(meal.hour) > -1">
                                                <div class="label label-success f-400 f-14 m-r-5">
                                                    <span>Kcal {{ meal.kcal }}</span>
                                                </div>

                                                <div class="label label-success f-400 f-14 m-r-5">
                                                    <span>Proteína {{ meal.protein }} g</span>
                                                </div>

                                                <div class="label label-success f-400 f-14 m-r-5">
                                                    <span>Carboidrato {{ meal.carb }} g</span>
                                                </div>

                                                <div class="label label-success f-400 f-14 m-r-5">
                                                    <span>Lipídios {{ meal.fat }} g</span>
                                                </div>

                                                <div class="label label-success f-400 f-14 m-r-5">
                                                    <span>Fibra {{ meal.fiber }} g</span>
                                                </div>
                                            </div>

                                            <button class="btn btn-default btn-sm" @click="toggleDietInfo(meal.hour)">
                                                {{interactions.dietsInfoOpened.indexOf(meal.hour) > -1 ? 'Esconder' : 'Mostrar'}} informação nutricional
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <!-- /Diet Time Line -->
                                <hr>

                                <div class="form-group m-t-10">
                                     <label>Compartilhar no feed de atividades?</label>
                                     <label class="switch">
                                         <input type="checkbox" v-model="newDiet.share_profile">
                                         <div class="slider round"></div>
                                     </label>
                                 </div>
                                <button class="btn btn-success btn-sm btn-block" :disabled="!newDiet.meals.length" @click="saveDiet()">Salvar dieta</button>
                            </div>
                            <!-- / Card Body -->
                        </div>
                        <!-- /Card -->
                    </div>
                </div>
            </div>
        </div>
        <!-- /NEW DIET ADDED -->

        <!-- DIET LIST -->

        <div class="container m-t-20" v-if="!checkPermission('diets_show')">
            <div class="alert alert-info">
                O cliente não autorizou a visualização das dietas.
            </div>
        </div>

        <div class="container m-t-20" v-if="checkPermission('diets_show') && diets.length">

            <card-placeholder v-if="placeholder.list" :onlyHeader="true">
            </card-placeholder>

            <div class="row" v-if="!placeholder.list">
                <div class="col-sm-6 col-md-6 col-xs-12" v-for="(diet, indexDiet) in diets">
                    <!-- Card -->
                    <div class="card">
                        <!-- Card Header -->
                        <div class="card-header ch-alt cursor-pointer ch-with-control p-b-10" @click="interactions.dietsCardOpened.toggleSelected(diet.id)">
                            <div class="row">
                                <div class="col-xs-4 col-md-4">
                                    <div class="picture-circle picture-circle-p" :style="`background-image:url('${ diet.from.avatar }')`">
                                    </div>
                                </div>
                                <div class="col-xs-8 col-md-8">
                                    <h4 class="f-300 t-overflow m-0 m-b-5">{{ diet.from.full_name }}</h4>
                                    <span class="t-overflow m-t-5 f-300">
                                        <i class="ion-ios-calendar-outline m-r-5"></i>{{ diet.created_at | moment('DD/MM/YYYY') }}
                                    </span>
                                </div>
                            </div>
                            <!-- toggle button open and close card -->
                            <div class="control-header">
                                <i class="ion-ios-arrow-down f-22" v-if="interactions.dietsCardOpened.indexOf(diet.id) == -1"></i>
                                <i class="ion-ios-arrow-up f-22" v-if="interactions.dietsCardOpened.indexOf(diet.id) > -1"></i>
                            </div>
                            <!-- toggle button open and close card -->
                        </div>
                        <!-- /Card Header -->

                        <!-- Card Body -->
                        <div class="card-body card-padding" v-if="interactions.dietsCardOpened.indexOf(diet.id) > -1">

                            <div class="full text-center m-t-10 m-b-20">
                                <h4 class="f-300">Observações</h4>
                                <span class="f-300 f-info" v-if="diet.observation">{{diet.observation}}</span>
                                <span class="f-300 f-info" v-if="!diet.observation">Esta dieta não possui observações.</span>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-md-12 col-xs-12 text-center">
                                    <h4 class="f-300">Macro nutrientes por dia</h4>
                                    <span class="label label-success f-400 f-16 m-r-5 p-5 m-b-5">kcal: {{diet.daily_total_kcal}}</span>
                                    <span class="label label-success f-400 f-16 m-r-5 p-5 m-b-5">Proteína: {{diet.daily_total_protein}} g</span>
                                    <span class="label label-success f-400 f-16 m-r-5 p-5 m-b-5">Carboidrato: {{diet.daily_total_carb}} g</span>
                                    <span class="label label-success f-400 f-16 m-r-5 p-5 m-b-5">Lipídios: {{diet.daily_total_fat}} g</span>
                                    <span class="label label-success f-400 f-16 m-r-5 p-5 m-b-5">Fibra: {{diet.daily_total_fiber}} g</span>
                                </div>
                            </div>
                            <hr>
                            <h4 class="f-300 text-center m-t-20">Refeições</h4>
                            <p class="text-center f-300 f-danger" v-show="!diet.meals.length">Esta dieta esta vazia</p>
                            <!-- <hr v-if="diet.meals.length"> -->

                            <!-- Diet Time Line -->
                            <div class="line" v-if="diet.meals.length">
                                <div class="line-border"></div>
                                <div class="line-item m-b-20" v-for="(meal, indexMeal) in diet.meals">
                                    <span class="line-date f-400 label label-info f-14"><i class="ion-android-time"></i> {{ meal.hour }}</span>
                                    <i class="line-icon success"></i>

                                    <h3 class="f-300">
                                        {{ meal.type }}
                                    </h3>

                                    <div class="line-item-group">

                                        <div v-for="(option, indexOptions) in meal.options">
                                            <div class="d-block">
                                                <h4 class="f-300" v-for="(item, indexItemOption) in option.items">
                                                    <span class="label label-info f-400 p-5 m-r-5 m-b-5" >
                                                        {{ item }}
                                                    </span>
                                                </h4>
                                                <span v-show="indexOptions != meal.options.length-1">ou</span>
                                            </div>
                                        </div>

                                        <div class="m-b-10 text-center" v-show="interactions.dietsInfoOpened.indexOf(meal.hour) > -1">

                                            <div class="label label-success f-400 f-14 m-r-5">
                                                <span>Kcal {{ meal.kcal }}</span>
                                            </div>

                                            <div class="label label-success f-400 f-14 m-r-5">
                                                <span>Proteína {{ meal.protein }} g</span>
                                            </div>

                                            <div class="label label-success f-400 f-14 m-r-5">
                                                <span>Carboidrato {{ meal.carb }} g</span>
                                            </div>

                                            <div class="label label-success f-400 f-14 m-r-5">
                                                <span>Lipídios {{ meal.fat }} g</span>
                                            </div>

                                            <div class="label label-success f-400 f-14 m-r-5">
                                                <span>Fibra {{ meal.fiber }} g</span>
                                            </div>
                                        </div>

                                        <button class="btn btn-default btn-sm" @click="toggleDietInfo(meal.hour)">
                                            {{interactions.dietsInfoOpened.indexOf(meal.hour) > -1 ? 'Esconder' : 'Mostrar'}} informação nutricional
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <!-- /Diet Time Line -->

                            <button class="btn btn-info btn-xs btn-block m-t-10" @click="savePDF(diet.id)">Imprimir dieta</button>

                            <hr>

                            <button class="btn btn-danger btn-block btn-xs" @click="removeDiet(indexDiet, diet.id)" v-if="checkPermission('diets_edit')">Excluir dieta</button>

                        </div>
                        <!-- / Card Body -->
                    </div>
                    <!-- /Card -->
                </div>
            </div>
        </div>
        <!-- /DIET LIST -->

        <div class="text-center" v-if="checkPermission('diets_show') && !diets.length">
            <span class="d-block m-t-30 f-300">
                <i class="d-block ion-sad-outline f-24"></i>
                Nenhuma dieta adicionada.
            </span>
        </div>

        <div class="text-center m-t-20 m-b-20"  v-if="checkPermission('diets_show')">
            <button class="btn btn-sm btn-info" @click="getDestroyedsDiets()">Carregar dietas excluídas</button>
        </div>

        <!-- DIET DESTROYEDS LIST -->
        <div class="container">

            <card-placeholder
                v-if="interactions.clickedToGetDestroyedList && placeholder.destroyedList"
                :onlyHeader="true"
            >
            </card-placeholder>

            <div class="row" v-if="diets_destroyeds.length && !placeholder.destroyedList">
                <div class="col-sm-6 col-xs-12" v-for="(diet, indexDiet) in diets_destroyeds">
                    <!-- Card -->
                    <div class="card">

                        <!-- Card Header -->
                        <div class="card-header ch-alt cursor-pointer ch-with-control p-b-10" @click="interactions.dietsCardOpened.toggleSelected(diet.id)">
                            <div class="row">
                                <div class="col-xs-4 col-md-4">
                                    <div class="picture-circle picture-circle-p" :style="`background-image:url('${ diet.from.avatar }')`">
                                    </div>
                                </div>
                                <div class="col-xs-8 col-md-8">
                                    <h4 class="f-300 t-overflow m-0 m-b-5">{{ diet.from.full_name }}</h4>
                                    <span class="t-overflow m-t-5 f-300">
                                        <i class="ion-ios-calendar-outline m-r-5"></i>{{ diet.created_at | moment('DD/MM/YYYY') }}
                                    </span>
                                </div>
                            </div>
                            <!-- toggle button open and close card -->
                            <div class="control-header">
                                <i class="ion-ios-arrow-down f-22" v-if="interactions.dietsCardOpened.indexOf(diet.id) == -1"></i>
                                <i class="ion-ios-arrow-up f-22" v-if="interactions.dietsCardOpened.indexOf(diet.id) > -1"></i>
                            </div>
                            <!-- toggle button open and close card -->
                        </div>
                        <!-- /Card Header -->

                        <!-- Card Body -->
                        <div class="card-body card-padding" v-if="interactions.dietsCardOpened.indexOf(diet.id) > -1">

                            <div class="full text-center m-t-10 m-b-20">
                                <h4 class="f-300">Observações</h4>
                                <span class="f-300 f-info" v-if="diet.observation">{{diet.observation}}</span>
                                <span class="f-300 f-info" v-if="!diet.observation">Esta dieta não possui observações.</span>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-md-12 col-xs-12 text-center">
                                    <h4 class="f-300">Macro nutrientes por dia</h4>
                                    <span class="label label-success f-400 f-16 m-r-5 p-5 m-b-5">kcal: {{diet.daily_total_kcal}}</span>
                                    <span class="label label-success f-400 f-16 m-r-5 p-5 m-b-5">Proteína: {{diet.daily_total_protein}} g</span>
                                    <span class="label label-success f-400 f-16 m-r-5 p-5 m-b-5">Carboidrato: {{diet.daily_total_carb}} g</span>
                                    <span class="label label-success f-400 f-16 m-r-5 p-5 m-b-5">Lipídios: {{diet.daily_total_fat}} g</span>
                                    <span class="label label-success f-400 f-16 m-r-5 p-5 m-b-5">Fibra: {{diet.daily_total_fiber}} g</span>
                                </div>
                            </div>
                            <hr>
                            <h4 class="f-300 text-center m-t-20">Refeições</h4>
                            <p class="text-center f-300 f-danger" v-show="!diet.meals.length">Esta dieta esta vazia</p>
                            <!-- <hr v-if="diet.meals.length"> -->

                            <!-- Diet Time Line -->
                            <div class="line" v-if="diet.meals.length">
                                <div class="line-border"></div>
                                <div class="line-item m-b-20" v-for="(meal, indexMeal) in diet.meals">
                                    <span class="line-date f-400 label label-info f-14"><i class="ion-android-time"></i> {{ meal.hour }}</span>
                                    <i class="line-icon success"></i>

                                    <h3 class="f-300">
                                        {{ meal.type }}
                                    </h3>

                                    <div class="line-item-group">

                                        <div v-for="(option, indexOptions) in meal.options">
                                            <div class="d-block">
                                                <h4 class="f-300" v-for="(item, indexItemOption) in option.items">
                                                    <span class="label label-info f-400 p-5 m-r-5 m-b-5" >
                                                        {{ item }}
                                                    </span>
                                                </h4>
                                                <span v-show="indexOptions != meal.options.length-1">ou</span>
                                            </div>
                                        </div>

                                        <div class="m-b-10 text-center" v-show="interactions.dietsInfoOpened.indexOf(meal.hour) > -1">
                                            <div class="label label-success f-400 f-14 m-r-5">
                                                <span>Kcal {{ meal.kcal }}</span>
                                            </div>

                                            <div class="label label-success f-400 f-14 m-r-5">
                                                <span>Proteína {{ meal.protein }} g</span>
                                            </div>

                                            <div class="label label-success f-400 f-14 m-r-5">
                                                <span>Carboidrato {{ meal.carb }} g</span>
                                            </div>

                                            <div class="label label-success f-400 f-14 m-r-5">
                                                <span>Lipídios {{ meal.fat }} g</span>
                                            </div>

                                            <div class="label label-success f-400 f-14 m-r-5">
                                                <span>Fibra {{ meal.fiber }} g</span>
                                            </div>
                                        </div>

                                        <button class="btn btn-default btn-sm" @click="toggleDietInfo(meal.hour)">
                                            {{interactions.dietsInfoOpened.indexOf(meal.hour) > -1 ? 'Esconder' : 'Mostrar'}} informação nutricional
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <!-- /Diet Time Line -->
                            <hr>
                            <button class="btn btn-danger btn-block btn-xs" @click="restoreDiet(indexDiet, diet.id)" v-if="checkPermission('diets_edit')">Restaurar esta dieta</button>
                        </div>
                        <!-- / Card Body -->
                    </div>
                    <!-- /Card -->
                </div>
            </div>
        </div>
        <!-- /DIET DESTROYEDS LIST -->


        <!-- MODAL ADD OPTION -->
        <div class="modal" id="modal-add-option" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">Adicionar opção à refeição</h4>
                    </div>
                    <div class="modal-body">

                    <fieldset class=" m-t-20">
                        <small class="f-300 m-b-20">Uma refeição pode conter uma ou mais opções</small>

                        <table class="table table-bordered table-hover table-striped">
                            <thead>
                                <tr>
                                    <th>Items desta opção</th>
                                    <th class="text-center" width="10%">Excluir</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, indexItem) in newOption.items">
                                    <td>{{item}}</td>
                                    <td class="text-center" width="10%"><button class="btn btn-xs btn-danger" @click="newOption.items.splice(indexItem,1)"><i class="ion-android-close"></i></button></td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="form-group">
                            <div class="row m-t-20">
                                <div class="col-sm-12 col-xs-12">
                                    <label class="full">
                                        <span>Novo item</span>
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="newItem"
                                            placeholder="1 fatia de queijo, 1 fatia de pão e etc"
                                            @keyup.enter="addItemToOption()"
                                        >
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <button class="btn btn-info btn-sm btn-block" @click="addItemToOption()" :disabled="!newItem">Adicionar item à opção</button>
                        </div>

                    </fieldset>

                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" data-dismiss="modal">Cancelar</button>
                        <button class="btn btn-info" data-dismiss="modal" @click="addOptionToMeal()" :disabled="!newOption.items.length">Adicionar opção</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- MODAL ADD OPTION -->
    </div>

</template>

<script>

    import {cleanDietModel} from '@/models/Diet'
    import { mapGetters, mapActions } from 'vuex'
    import {apiRootUrl} from '@/config'
    import cardPlaceholder from '@/components/card-placeholder.vue'
    import Multiselect from 'vue-multiselect'

    export default{
        name: 'client-dashboard-diets',
        components: {
            cardPlaceholder,
            Multiselect
        },
        props: {
        	client: {
        		type: Object
        	}
        },
        data() {
            return {
                interactions : {
                    addDiet: false,
                    showCardContent: true,
                    showMealInfo: false,
                    dietsInfoOpened: [],
                    dietsCardOpened: [],
                    clickedToGetDestroyedList: false,
                },
                placeholder: {
                    list: true,
                    destroyedList: true
                },
                newDiet: cleanDietModel(),
                newMeal: {
                    type: '',
                    hour: '',
                    protein: 0,
                    carb: 0,
                    fat: 0,
                    fiber: 0,
                    kcal: 0,
                    options: [],
                },
                newOption:{
                    items: []
                },
                newItem: '',
                diets: [],
                diets_destroyeds_has_tryied: false,
                diets_destroyeds: [],
                meal_types: [],
                selectedMealType: null,
            }
        },
        computed:{
            ...mapGetters(['currentCompany', 'currentUser','checkPermission', 'currentClient'])
        },
        mounted: function(){

            if(this.currentUser.role == 'professional'){

                let has_companies = this.currentUser.companies.length ? true : false

                if(has_companies && _.isEmpty(this.currentCompany)){
                    let company_id = JSON.parse(window.localStorage.getItem('current_company'))
                    if(company_id){
                        this.$router.push({name: 'admin.companies.show', params:{ company_id: company_id}})
                    }
                    return false
                }

            }

            this.getDiets()
            this.getMealTypes()

        },
        methods: {
            ...mapActions(['incrementClientTotalXp']),

            toggleDietInfo: function(hour){
                let that = this

                var index = that.interactions.dietsInfoOpened.indexOf(hour);

                if(index > -1){
                    that.interactions.dietsInfoOpened.splice(index,1)
                } else {
                    that.interactions.dietsInfoOpened.push(hour)
                }
            },

            toggleDietCard: function(dietId){
                let that = this

                var index = that.interactions.dietsCardOpened.indexOf(dietId);

                if(index > -1){
                    that.interactions.dietsCardOpened.splice(index,1)
                } else {
                    that.interactions.dietsCardOpened.push(dietId)
                }
            },

            addItemToOption: function(){
                let that = this

                that.newOption.items.push(JSON.parse(JSON.stringify(that.newItem.toTitleCase())));
                that.newItem = '';
            },

            addOptionToMeal: function(){
                let that = this

                $('#modal-add-option').modal('hide');
                that.newMeal.options.push(JSON.parse(JSON.stringify(that.newOption)));
                that.newOption = {
                    items: []
                }
            },

            handleMealType() {
                this.newMeal.type = this.newMeal.type.toTitleCase();
            },

            addMealToDiet: function(){
                let that = this

                that.newDiet.meals.push(JSON.parse(JSON.stringify(that.newMeal)));

                that.newDiet.daily_total_kcal = that.newDiet.meals.reduce((ac, meal) => ac + parseFloat(meal.kcal) ,0);
                that.newDiet.daily_total_protein = that.newDiet.meals.reduce((ac, meal) => ac + parseFloat(meal.protein) ,0);
                that.newDiet.daily_total_carb = that.newDiet.meals.reduce((ac, meal) => ac + parseFloat(meal.carb) ,0);
                that.newDiet.daily_total_fat = that.newDiet.meals.reduce((ac, meal) => ac + parseFloat(meal.fat) , 0);
                that.newDiet.daily_total_fiber = that.newDiet.meals.reduce((ac, meal) => ac + parseFloat(meal.fiber) , 0);

                setTimeout(function() {
                    that.newMeal = {
                        type: '',
                        hour: '',
                        protein: 0,
                        carb: 0,
                        fat: 0,
                        fiber: 0,
                        kcal: 0,
                        options: [],
                    }
                    that.selectedMealType = null

                }, 200);
            },

            calcMacros: function(){
                let that = this

                that.newDiet.daily_total_kcal = that.newDiet.meals.reduce((ac, meal) => ac + parseFloat(meal.kcal) ,0);
                that.newDiet.daily_total_protein = that.newDiet.meals.reduce((ac, meal) => ac + parseFloat(meal.protein) ,0);
                that.newDiet.daily_total_carb = that.newDiet.meals.reduce((ac, meal) => ac + parseFloat(meal.carb) ,0);
                that.newDiet.daily_total_fat = that.newDiet.meals.reduce((ac, meal) => ac + parseFloat(meal.fat) , 0);
                that.newDiet.daily_total_fiber = that.newDiet.meals.reduce((ac, meal) => ac + parseFloat(meal.fiber) , 0);
            },

            removeItem: function(array, index, array2, index2){
                let that = this

                that.$swal({
                    title: 'Excluir item',
                    text: 'Tem certeza que gostaria de excluir este item da refeição?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: '#82CB7D',
                    reverseButtons: true
                }).then(function () {
                    array.splice(index, 1)

                    if(!array.length){
                        array2.splice(index2, 1)
                    }

                    that.calcMacros();
                }).catch(function () {

                })

            },

            removeMeal: function(meals, index){
                let that = this

                that.$swal({
                    title: 'Excluir item',
                    text: 'Tem certeza que gostaria de excluir esta refeição da dieta?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: '#82CB7D',
                    reverseButtons: true
                }).then(function () {

                    meals.splice(index, 1)
                    that.calcMacros();

                }).catch(function () {

                })

            },

            saveDiet: function(){
                let that = this

                that.newDiet.client_id = that.client.id;

                that.$http.post(`client/diet/create`, that.newDiet)
                    .then(function (response) {

                        that.newDiet = cleanDietModel()
                        that.interactions.addDiet = false;

                        successNotify('', 'Dieta criada com sucesso.')

                        //Add XP points to client
                        that.incrementClientTotalXp(1)

                        that.getDiets();
                    })
                    .catch(function (error) {
                        console.log(error)
                    });

            },

            removeDiet: function(indexDiet, dietId){
                let that = this

                var data = {
                    client_id: that.client.id,
                    diet_id: dietId
                }

                that.$swal({
                    title: 'Excluir dieta',
                    text: 'Tem certeza que gostaria de excluir esta dieta?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: '#82CB7D',
                    reverseButtons: true
                }).then(function () {

                    that.$http.post(`client/diet/destroy`, data)
                    .then(function (response) {
                        that.diets.splice(indexDiet, 1)
                        successNotify('', 'Dieta excluída com sucesso.')

                        const index = that.interactions.dietsCardOpened.indexOf(dietId);
                        if(index > -1){
                            that.interactions.dietsCardOpened.splice(index,1)
                        }

                    })
                    .catch(function (error) {
                        console.log(error)
                    });

                }).catch(function () {

                })

            },

            restoreDiet: function(indexDiet, dietId){
                let that = this

                var data = {
                    client_id: that.client.id,
                    diet_id: dietId
                }

                that.$swal({
                    title: 'Reativar dieta',
                    text: 'Tem certeza que gostaria de reativar esta dieta?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: '#82CB7D',
                    reverseButtons: true
                }).then(function () {

                    that.$http.post(`client/diet/undestroy`, data)
                    .then(function (response) {
                        that.diets_destroyeds.splice(indexDiet, 1)
                        successNotify('', 'Dieta restaurada com sucesso.')
                        that.getDiets();
                        const index = that.interactions.dietsCardOpened.indexOf(dietId);
                        if(index > -1){
                            that.interactions.dietsCardOpened.splice(index,1)
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    });

                }).catch(function () {

                })

            },

            getDiets(){
                let that = this

                that.placeholder.list = true

                that.$http.post(`client/diet/list`, {client_id: that.$route.params.client_id})
                    .then(function (response) {
                        that.diets = response.data.diets
                        setTimeout(() => {
                            that.placeholder.list = false
                        }, 200);
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            getDestroyedsDiets(){
                let that = this

                that.interactions.clickedToGetDestroyedList = true
                that.placeholder.destroyedList = true

                that.$http.post(`client/diet/list/destroyeds`, {client_id: that.client.id})
                    .then(function (response) {
                        that.diets_destroyeds = response.data.diets_destroyeds
                        setTimeout(() => {
                            that.interactions.clickedToGetDestroyedList = false
                            that.placeholder.destroyedList = false
                        }, 200);
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            categoriesCount(list) {
                return list.length - 2
            },

            // OPEN SYSTEM NAVIGATOR WITH PDF TO DOWNLOAD
            savePDF(diet_id) {
                window.open( apiRootUrl + 'tools/print/diet/' + diet_id, '_system', null);
            },

            getMealTypes: function(){
                let that = this

                this.$http.get('meal/type/list').then(response => {

                    that.meal_types = response.data

                }, response => {
                    // error callback
                });
            },

            setMealType(selected){

                this.selectedMealType = selected
                this.newMeal.type = selected.name

            },

        }
    }
</script>

<style scoped>
    .line .line-date {
        position: absolute;
        left: 5px;
        top: 0%;
        margin-top: -8.5px;
    }
</style>
