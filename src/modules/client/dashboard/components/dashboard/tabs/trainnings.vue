<template>

   	<div>

        <div class="container">
            <div class="text-center">
                <img class="img-icon" src="../../../../../../assets/icons/exercise.png" alt="">
                <h4 class="f-300">Treinamentos</h4>
            </div>

            <div class="row">
                <div class="col-sm-12" v-if="checkPermission('trainnings_edit')">
                    <button type="button" class="btn f-20 btn-light btn-block f-300" name="button" @click="interactions.addTrainning = !interactions.addTrainning">
                        <span v-if="interactions.addTrainning"><i class="ion-ios-minus-outline m-r-5"></i>Ocultar</span>
                        <span v-if="!interactions.addTrainning"><i class="ion-ios-plus-outline m-r-5"></i>{{interactions.isUpdate ? 'Editar' : 'Novo'}} treinamento</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Form New trainning -->
        <div class="container m-t-20" v-if="interactions.addTrainning">

            <div class="card ">
                <div class="card-header ch-alt text-center">
                    <h4 class="f-300">Novo treinamento</h4>
                </div>

                <div class="card-body card-padding">
                    <h4>Informações</h4>
                    <div class="row">
                        <div class="col-sm-6 col-xs-12">
                            <div class="form-group">
                                <label>Dia da semana</label>
                                <select class="form-control" v-model="newTrainning.dow">
                                    <option selected value="1">Segunda-feira</option>
                                    <option value="2">Terça</option>
                                    <option value="3">Quarta-feira</option>
                                    <option value="4">Quinta-feira</option>
                                    <option value="5">Sexta-feira</option>
                                    <option value="6">Sábado</option>
                                    <option value="0">Domingo</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-sm-6 col-xs-12">
                            <div class="form-group">
                                <label>Frequência cardíaca (alvo)</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="newTrainning.heart_rate"
                                    placeholder="Frequência cardíaca alvo"
                                >
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Observações</label>
                        <textarea
                            type="text"
                            class="form-control"
                            v-model="newTrainning.observation"
                            placeholder="Observações sobre este treinamento"
                        ></textarea>
                    </div>

                    <h4>Exercícios</h4>
                        <p class="f-13 f-300">Adicione série de exercícios e suas repetições</p>
                        <p class="f-13 f-300">Clique duas vezes nas <b>séries, exercícios ou repetições</b> para excluir.</p>

                        <p v-if="!newTrainning.series.length">Adicione séries e exercícios à este treinamento</p>


                        <div v-for="(serie, indexSerie) in newTrainning.series" class="line-item-group p-10">

                            <h4>
                                <span class="label label-default f-18 f-400 p-10 full cursor-pointer" @dblclick="newTrainning.series.splice(indexSerie,1)">{{serie.name}}</span>
                                    <button class="pull-right btn btn-danger btn-xs m-t-5" @click="newTrainning.series.splice(indexSerie,1)">x</button>
                            </h4>

                            <p v-if="!serie.exercises.length">Nenhum exercício adicionado à série</p>

                            <!-- EXERCICIOS-->
                            <div class="" v-for="(exercise, indexExercise) in serie.exercises">
                                <h4>
                                    <span class="label label-default f-16 f-400 p-10 full cursor-pointer m-t-5" @dblclick="serie.exercises.splice(indexExercise, 1)">{{exercise.name}}</span>
                                    <button class="pull-right btn btn-danger btn-xs m-t-5" @click="serie.exercises.splice(indexExercise, 1)">x</button>
                                </h4>
                                Intervalo:
                                <span class="label label-default f-14 p-5 f-400 m-r-5 m-b-5" >
                                    {{serie.interval}}
                                </span>
                                <br>
                                Local:
                                <span class="label label-default f-14 p-5 f-400 m-r-5 m-b-5" >
                                    {{exercise.location}}
                                </span>
                                <br>
                                Posição:
                                <span class="label label-default f-14 p-5 f-400 m-r-5 m-b-5" >
                                    {{exercise.position}}
                                </span>
                                <div class="">
                                    <h5>Série e repetições</h5>
                                    <p v-if="!exercise.method.length">Nenhuma série de repetição adicionada</p>
                                    <span  v-for="(method, indexMethod) in exercise.method">
                                        <span class="label label-default f-14 p-5 f-400 m-r-5 m-b-5 cursor-pointer" @dblclick="exercise.method.splice(indexMethod,1)">
                                            {{method.label}}: {{ method.quantity }} x {{method.load}} | Ritmo: {{method.cadency}}
                                        </span><button class="btn btn-danger btn-xs" @click="exercise.method.splice(indexMethod,1)">x</button>
                                    </span>
                                    <br>
                                    <button class="btn btn-info btn-xs m-t-5" data-toggle="modal" data-target="#modal-method" @click="selectExercise(indexSerie, indexExercise)">Nova repetição</button>
                                </div>

                            </div>

                            <hr>
                            <button class="btn btn-info btn-xs" data-toggle="modal" data-target="#modal-exercise" @click="selectSerie(indexSerie)">Novo exercício</button>

                        </div>

                        <button class="btn btn-info btn-sm m-t-10" data-toggle="modal" data-target="#modal-serie">Nova série</button>

                        <div class="full">
                            <hr>

                            <div class="form-group m-t-10">
                                 <label>Compartilhar no feed de atividades?</label>
                                 <label class="switch">
                                     <input type="checkbox" v-model="newTrainning.share_profile">
                                     <div class="slider round"></div>
                                 </label>
                             </div>

                            <button
                                class="btn btn-sm btn-success btn-block m-t-10"
                                @click="saveTrainning()"
                                v-show="!interactions.isUpdate"
                                :disabled="!newTrainning.series.length"
                            >
                                Salvar treinamento
                            </button>
                            <button
                                class="btn btn-sm btn-info btn-block m-t-10"
                                @click="updateTrainning()"
                                v-show="interactions.isUpdate"
                                :disabled="!newTrainning.series.length || !newTrainning.series.map((serie) => serie.exercises.length)"
                            >
                                Atualizar treinamento
                            </button>

                        </div>
                </div>
            </div>

        </div>

            <!-- TRAINNINGS LIST -->
        <div class="container m-t-20">

            <div class="container m-t-20" v-if="!checkPermission('trainnings_show')">
                <div class="alert alert-info">
                    O cliente não autorizou a visualização dos treinamentos.
                </div>
            </div>

            <card-placeholder
                v-if="placeholder.list"
                :onlyHeader="true"
            >
            </card-placeholder>

            <div class="row" v-if="checkPermission('trainnings_show') && trainnings.length && !placeholder.list">
                <div class="col-sm-4 col-xs-12" v-for="(trainning, indexTrainning) in trainnings">
                    <!-- Card -->
                    <div class="card m-t-10">

                        <!-- Card Header -->
                        <div class="card-header ch-alt cursor-pointer ch-with-control p-b-10" @click="interactions.trainningsCardOpened.toggleSelected(trainning.id)">
                            <div class="row">
                                <div class="col-xs-4 col-sm-4">
                                    <div
                                        class="picture-circle picture-circle-p"
                                        :style="`background-image:url('${trainning.from.avatar }')`"
                                    >
                                    </div>
                                </div>
                                <div class="col-xs-8 col-sm-8">
                                    <h4 class="f-300 t-overflow m-0 m-b-5">{{ trainning.from.full_name }}</h4>
                                    <span class="f-300 t-overflow m-t-10">
                                        <i class="ion-ios-calendar-outline m-r-5"></i>{{ trainning.created_at | moment('dddd') }}
                                    </span>
                                </div>
                            </div>
                            <!-- toggle button open and close card -->
                            <span class="control-header">
                                <i class="ion-ios-arrow-down f-22" v-if="interactions.trainningsCardOpened.indexOf(trainning.id) == -1"></i>
                                <i class="ion-ios-arrow-up f-22" v-if="interactions.trainningsCardOpened.indexOf(trainning.id) > -1"></i>
                            </span>
                            <!-- / toggle button open and close card -->
                        </div>
                        <!-- /Card Header -->

                        <!-- Card Body -->
                        <div class="card-body p-10" v-show="interactions.trainningsCardOpened.indexOf(trainning.id) > -1">
                            <div class="m-t-10">
                                <span class="d-block text-center f-300">
                                    <i class="ion-ios-heart f-20 d-block f-danger"></i>{{ trainning.heart_rate }}
                                    <span v-if="!trainning.heart_rate">Frequência cardíaca não informada</span>
                                </span>
                            </div>
                            <hr>
                            <div class="text-center m-t-10 m-b-20">
                                <h4 class="f-300">Observações</h4>
                                <span class="f-300 f-info" v-if="trainning.observation">{{trainning.observation}}</span>
                                <span class="f-300 f-info" v-if="!trainning.observation">Este treinamento não possui observações.</span>
                            </div>

                            <hr v-if="trainning.series.length">

                            <fieldset class="full">
                                <legend class="text-center">Exercícios</legend>

                                <div v-for="(serie, indexSerie) in trainning.series" class="line-item-group p-10">

                                    <h4 v-show="serie.name">
                                        <span class="label label-default f-18 f-400 p-10 full" @dblclick="trainning.series.splice(indexSerie,1)">{{serie.name}}</span>
                                    </h4>

                                    <p v-if="!serie.exercises.length">Nenhum exercício adicionado à série</p>

                                    <!-- EXERCICIOS-->
                                    <div class="" v-for="(exercise, indexExercise) in serie.exercises">
                                        <h4>
                                            <span class="label label-default f-16 f-400 p-10 full m-t-5" @dblclick="serie.exercises.splice(indexExercise, 1)">{{exercise.name}}</span>
                                        </h4>
                                        Intervalo:
                                        <span class="label label-default f-14 p-5 f-400 m-r-5 m-b-5" >
                                            {{serie.interval}}
                                        </span>
                                        <br>
                                        Local:
                                        <span class="label label-default f-14 p-5 f-400 m-r-5 m-b-5" >
                                            {{exercise.location}}
                                        </span>
                                        <br>
                                        Posição:
                                        <span class="label label-default f-14 p-5 f-400 m-r-5 m-b-5" >
                                            {{exercise.position}}
                                        </span>
                                        <div class="">
                                            <h5>Série e repetições</h5>
                                            <p v-if="!exercise.method.length">Nenhuma série de repetição adicionada</p>
                                            <span  v-for="(method, indexMethod) in exercise.method">
                                                <span class="label label-default f-14 p-5 f-400 m-r-5 m-b-5" @dblclick="exercise.method.splice(indexMethod,1)">
                                                    {{method.label}}: {{ method.quantity }} x {{method.load}} | Ritmo: {{method.cadency}}
                                                </span>
                                            </span>
                                            <br>

                                        </div>

                                    </div>

                                </div>
                            </fieldset>

                            <button class="btn btn-info btn-xs btn-block m-t-10" @click="savePDF(trainning.id)">Imprimir treinamento</button>

                            <hr>

                            <button class="btn btn-info btn-xs btn-block" @click="selectTrainningToEdit(trainning)" v-if="checkPermission('trainnings_edit')">Editar treinamento</button>

                            <hr>

                            <button class="btn btn-danger btn-xs btn-block" @click="removeTrainning(indexTrainning, trainning.id)" v-if="checkPermission('trainnings_edit')">Excluir treinamento</button>

                        </div>
                        <!-- /Card Body -->

                    </div>
                </div>
            </div>
            <!-- /TRAINNINGS LIST -->

            <div class="text-center" v-if="checkPermission('trainnings_show') && !trainnings.length">
                <span class="d-block m-t-30 f-300">
                    <i class="d-block ion-sad-outline f-24"></i>
                    Nenhum treinamento adicionado.
                </span>
            </div>

            <div class="text-center m-t-20 m-b-20" v-if="checkPermission('trainnings_show')">
                <button class="btn btn-info btn-sm" @click="getDestroyedsTrainnings()">Carregar treinamentos excluídos</button>
            </div>

            <!--  DESTROYED TRAINNINGS LIST -->

            <card-placeholder
                v-if="interactions.clickedToGetDestroyedList && placeholder.destroyedList"
                :onlyHeader="true"
            >
            </card-placeholder>

            <div class="row" v-if="checkPermission('trainnings_show') && trainnings_destroyeds.length && !placeholder.destroyedList">
                <div class="col-sm-4 col-xs-12" v-for="(trainning, indexTrainning) in trainnings_destroyeds">
                    <!-- Card -->
                    <div class="card">
                        <!-- Card Header -->
                        <div class="card-header ch-alt cursor-pointer ch-with-control p-b-10" @click="interactions.trainningsCardOpened.toggleSelected(trainning.id)">
                            <div class="row">
                                <div class="col-xs-4 col-sm-4">
                                    <div
                                        class="picture-circle picture-circle-p"
                                        :style="`background-image:url('${trainning.from.avatar }')`"
                                    >
                                    </div>
                                </div>
                                <div class="col-xs-8 col-sm-8">
                                    <h4 class="f-300 t-overflow m-0 m-b-5">{{ trainning.from.full_name }}</h4>
                                    <span class="f-300 t-overflow m-t-10">
                                        <i class="ion-ios-calendar-outline m-r-5"></i>{{ trainning.created_at | moment('DD/MM/YYYY') }}
                                    </span>
                                </div>
                            </div>
                            <!-- toggle button open and close card -->
                            <span class="control-header">
                                <i class="ion-ios-arrow-down f-22" v-if="interactions.trainningsCardOpened.indexOf(trainning.id) == -1"></i>
                                <i class="ion-ios-arrow-up f-22" v-if="interactions.trainningsCardOpened.indexOf(trainning.id) > -1"></i>
                            </span>
                            <!-- / toggle button open and close card -->
                        </div>
                        <!-- /Card Header -->

                        <!-- Card Body -->
                        <div class="card-body card-padding" v-show="interactions.trainningsCardOpened.indexOf(trainning.id) > -1">
                            <div class="m-t-10">
                                <span class="d-block text-center f-300">
                                    <i class="ion-ios-heart f-20 d-block f-danger"></i>{{ trainning.heart_rate }}
                                    <span v-if="!trainning.heart_rate">Frequência cardíaca não informada</span>
                                </span>
                            </div>
                            <hr>
                            <div class="text-center m-t-10 m-b-20">
                                <h4 class="f-300">Observações</h4>
                                <span class="f-300 f-info" v-if="trainning.observation">{{trainning.observation}}</span>
                                <span class="f-300 f-info" v-if="!trainning.observation">Este treinamento não possui observações.</span>
                            </div>

                            <hr v-if="trainning.series && trainning.series.length">

                            <fieldset class="full">
                                <legend class="text-center">Exercícios</legend>

                                <div v-for="(serie, indexSerie) in trainning.series" class="line-item-group p-10">

                                    <h4 v-show="serie.name">
                                        <span class="label label-default f-18 f-400 p-10 full" @dblclick="trainning.series.splice(indexSerie,1)">{{serie.name}}</span>
                                    </h4>

                                    <p v-if="serie.exercises && !serie.exercises.length">Nenhum exercício adicionado à série</p>

                                    <!-- EXERCICIOS-->
                                    <div class="" v-for="(exercise, indexExercise) in serie.exercises">
                                        <h4>
                                            <span class="label label-default f-16 f-400 p-10 full m-t-5" @dblclick="serie.exercises.splice(indexExercise, 1)">{{exercise.name}}</span>
                                        </h4>
                                        Intervalo:
                                        <span class="label label-default f-14 p-5 f-400 m-r-5 m-b-5" >
                                            {{serie.interval}}
                                        </span>
                                        <br>
                                        Local:
                                        <span class="label label-default f-14 p-5 f-400 m-r-5 m-b-5" >
                                            {{exercise.location}}
                                        </span>
                                        <br>
                                        Posição:
                                        <span class="label label-default f-14 p-5 f-400 m-r-5 m-b-5" >
                                            {{exercise.position}}
                                        </span>
                                        <div class="">
                                            <h5>Série e repetições</h5>
                                            <p v-if="exercise.method && !exercise.method.length">Nenhuma série de repetição adicionada</p>
                                            <span  v-for="(method, indexMethod) in exercise.method">
                                                <span class="label label-default f-14 p-5 f-400 m-r-5 m-b-5" @dblclick="exercise.method.splice(indexMethod,1)">
                                                    {{method.label}}: {{ method.quantity }} x {{method.load}} | Ritmo: {{method.cadency}}
                                                </span>
                                            </span>
                                            <br>

                                        </div>

                                    </div>

                                </div>
                            </fieldset>

                            <hr>

                            <button class="btn btn-info btn-xs btn-block m-t-10" @click="restoreTrainning(indexTrainning, trainning.id)" v-if="checkPermission('trainnings_edit')">Restaurar treinamento</button>

                        </div>
                        <!-- /Card Body -->

                    </div>
                </div>
            </div>
            <!-- / DESTROYED TRAINNINGS LIST -->
        </div>

        <!-- Modal List All Categories -->
        <modal-default :modalId="'modal-professional-categories'" :modalTitle="'Profissional'">
            <div slot="content">
                <div class="text-center" v-if="categoriesLoading">
                    <span class="300">Carregando profissional...</span>
                </div>
                <div class="text-center" v-if="!categoriesLoading" style="max-width: 300px; margin: 0 auto;">
                    <h1 class="f-300 m-b-30">{{ currentProfessional.full_name }}</h1>
                    <div class="picture-circle picture-circle-p" :style="`background-image:url('${ currentProfessional.avatar }')`">
                    </div>
                    <div class="m-t-30">
                        <span class="label label-primary f-300 f-20 m-b-5 m-r-5" v-for="cat in currentProfessional.categories">{{ cat.name }}</span>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <button data-dismiss="modal" type="button" class="btn btn-info">Conhecer profissional</button>
            </div>
        </modal-default>
        <!-- / Modal List All Categories -->

        <!-- ADD SERIE -->
        <div class="modal" id="modal-serie" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">Série e grupo de exercícios</h4>
                    </div>
                    <div class="modal-body">

                    <fieldset class=" m-t-20">
                        <small class="f-300 m-b-20">Uma série pode conter um ou mais exercícios. Ex: Super série, Séries compostas entre outras.</small>

                        <div class="form-group">
                            <div class="row m-t-20">
                                <div class="col-sm-12 col-xs-12">
                                    <label class="full">
                                        <span>Nome da série</span>
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="newSuperSerie.name"
                                            placeholder="Normal, Super Série, Dropset..."
                                        >
                                    </label>
                                </div>

                                <div class="col-sm-12 col-xs-12">
                                    <label class="full">
                                        <span>Intervalo entre exercícios</span>
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="newSuperSerie.interval"
                                            placeholder="45 seg, 60 seg, 2 min..."
                                        >
                                    </label>
                                </div>

                            </div>
                        </div>

                    </fieldset>

                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" data-dismiss="modal">Cancelar</button>
                        <button class="btn btn-info" data-dismiss="modal" @click="addNewSuperSerie()" :disabled="!newSuperSerie.name || !newSuperSerie.interval">Adicionar série</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- ADD SERIE -->

        <!-- ADD EXERCISE -->
        <div class="modal" id="modal-exercise" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">Exercício</h4>
                    </div>
                    <div class="modal-body">

                        <fieldset class="full m-t-20">
                            <legend class="f-300">Novo exercício</legend>
                            <small class="f-300">Adicione um ou mais exercícios à esta série.</small>

                            <hr>

                            <div class="form-group clearfix">
                                <div class="row">
                                    <div class="col-sm-12 col-xs-12">
                                        <label class="full">
                                            <span>Exercício</span>
                                            <input
                                                type="text"
                                                class="form-control"
                                                v-model="newExercise.name"
                                                placeholder="Nome do exercício"
                                            >
                                        </label>
                                    </div>

                                    <div class="col-md-6 col-sm-12 col-xs-12">
                                        <label class="full">
                                            <span>Local</span>
                                            <input
                                                type="text"
                                                class="form-control"
                                                v-model="newExercise.location"
                                                placeholder="Aparelho, esteira, elíptico, bicicleta"
                                            >
                                        </label>
                                    </div>

                                    <div class="col-md-6 col-sm-12 col-xs-12">
                                        <label class="full">
                                            <span>Posição</span>
                                            <input
                                                type="text"
                                                class="form-control"
                                                v-model="newExercise.position"
                                                placeholder="Reto, livre, 45º e etc"
                                            >
                                        </label>
                                    </div>

                                </div>
                            </div>
                        </fieldset>


                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" data-dismiss="modal">Fechar</button>
                        <button class="btn btn-info" data-dismiss="modal" @click="addNewExercise" :disabled="!newExercise.name">Adicionar exercício</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- ADD EXERCISE -->

        <!-- ADD METHOD -->
        <div class="modal" id="modal-method" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">Série e repetições</h4>
                    </div>
                    <div class="modal-body">

                        <fieldset class="full m-t-20">

                            <small class="f-300">Adicione as repetições ou cadência deste exercício</small>

                            <div class="form-group m-t-10">
                                <div class="row">
                                    <div class="col-sm-6 col-xs-6">
                                        <label class="full">
                                            <span>Tipo de repetição</span>
                                            <input
                                                type="text"
                                                class="form-control"
                                                v-model="newMethod.label"
                                                placeholder="Repetição, minutos, segundos, nome do circuito e etc"
                                            >
                                        </label>
                                    </div>

                                    <div class="col-sm-6 col-xs-6">
                                        <label class="full">
                                            <span>Ritmo</span>
                                            <input
                                                type="text"
                                                class="form-control"
                                                v-model="newMethod.cadency"
                                                placeholder="Livre, normal, lento, rápido"
                                            >
                                        </label>
                                    </div>

                                </div>
                            </div>

                            <div class="form-group clearfix">
                                <div class="row">
                                    <div class="col-sm-6 col-xs-6">
                                        <label class="full">
                                            <span>Quantidade</span>
                                            <input
                                                type="text"
                                                class="form-control"
                                                v-model="newMethod.quantity"
                                                placeholder="Quantas repetições, minutos etc"
                                            >
                                        </label>
                                    </div>

                                    <div class="col-sm-6 col-xs-6">
                                        <label class="full">
                                            <span>Peso ou velocidade</span>
                                            <input
                                                type="text"
                                                class="form-control"
                                                v-model="newMethod.load"
                                                placeholder="Peso, velocidade e etc"
                                            >
                                        </label>
                                    </div>
                                </div>
                            </div>


                        </fieldset>

                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" data-dismiss="modal">Fechar</button>
                        <button class="btn btn-info" data-dismiss="modal" @click="addNewMethod()" :disabled="!newMethod.label || !newMethod.quantity || !newMethod.load">Adicionar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- ADD METHOD -->

   	</div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import Avatar from '@/components/avatar.vue'
    import ModalDefault from '@/components/modal-default.vue'
    import cardPlaceholder from '@/components/card-placeholder.vue'
    import {apiRootUrl} from '@/config'

    const moment = require('moment')

    import TrainningModel from '@/models/Trainning'
    import {cleanTrainningModel} from '@/models/Trainning'

    export default{
        name: 'client-dashboard-trainnings',
        components: {
            Avatar,
            ModalDefault,
            cardPlaceholder
        },
        props: {
            client: {
                type: Object
            }
        },
        data() {
            return {
                interactions: {
                    addTrainning: false,
                    showCardContent: false,
                    trainningsCardOpened: [],
                    isUpdate: false,
                    clickedToGetDestroyedList: false
                },
                placeholder: {
                    list: true,
                    destroyedList: true
                },
                isValid: false,
                newTrainning: cleanTrainningModel(),
                categoriesLoading: true,
                currentProfessional: {},
                indexSelecteds: {
                    serie: 0,
                    exercise: 0,
                    method: 0,
                },
                newSuperSerie: {
                    name: 'Super serie',
                    interval: '60s',
                    exercises: [],
                },
                newExercise: {
                    name: 'Agachamento',
                    status: '',
                    position: 'Livre',
                    location: 'Barra',
                    method: [],
                },
                newMethod: {
                    cadency: 'Livre',
                    quantity: 10,
                    label: 'Rep',
                    load: '10k'
                },
                trainnings: [],
                trainnings_destroyeds: []
            }
        },

        computed:{
            ...mapGetters(['currentCompany', 'currentUser','checkPermission', 'currentClient']),

            orderedTrainnings(){
                return _.orderBy(this.trainnings, ['dow'], ['asc'])
            }
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

            this.getTrainnings()
        },
        methods: {

            ...mapActions(['incrementClientTotalXp']),

            selectTrainningToEdit: function(trainning){
                this.newTrainning = trainning;
                this.interactions.addTrainning = true;
                this.interactions.isUpdate = true;
                $('html, body').stop().animate({ scrollTop: 100 }, 500, 'easeInOutExpo');
            },

            selectSerie: function(indexSerie){
                this.indexSelecteds.serie = indexSerie
            },

            selectExercise: function(indexSerie, indexExercise){
                this.indexSelecteds.serie = indexSerie
                this.indexSelecteds.exercise = indexExercise
            },

            selectMethod: function(indexSerie, indexExercise, indexMethod){
                this.indexSelecteds.serie = indexSerie
                this.indexSelecteds.exercise = indexExercise
                this.indexSelecteds.method = indexMethod
            },

            addNewSuperSerie: function(){
                this.newTrainning.series.push(JSON.parse(JSON.stringify(this.newSuperSerie)));
            },
            addNewExercise: function(){
                this.newTrainning.series[this.indexSelecteds.serie].exercises.push(JSON.parse(JSON.stringify(this.newExercise)));
            },
            addNewMethod: function(){
                this.newTrainning.series[this.indexSelecteds.serie].exercises[this.indexSelecteds.exercise].method.push(JSON.parse(JSON.stringify(this.newMethod)));
            },

            handleNewTrainning() {
                // apenas uma validacao rapida para simular minha ideia
                if (this.newTrainning.name !== '' && this.newTrainning.interval.quantity !== '' && this.newTrainning.interval.label !== '') {
                    this.isValid = true
                }
            },

            getTrainnings(){
                let that = this

                that.placeholder.list = true

                that.$http.post(`client/trainning/list`, {client_id: that.$route.params.client_id})
                    .then(function (response) {
                        that.trainnings = response.data.trainnings
                        setTimeout(() => {
                            that.placeholder.list = false
                        }, 200);
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            handleDow(dow){
                return  moment().startOf('week').add(dow, 'days').format('dddd')
            },

            saveTrainning: function(){
                let that = this

                that.newTrainning.client_id = that.client.id;

                that.$http.post(`client/trainning/create`, that.newTrainning)
                    .then(function (response) {

                        that.newTrainning = cleanTrainningModel()
                        that.interactions.addTrainning = false;

                        //Add XP points to client
                        that.incrementClientTotalXp(1)

                        successNotify('', 'Treinamento adicionado com sucesso.')
                        that.getTrainnings();
                    })
                    .catch(function (error) {
                        console.log(error)
                    });

            },

            updateTrainning: function(){
                let that = this

                that.newTrainning.client_id = that.client.id;

                that.$http.post(`client/trainning/update`, that.newTrainning)
                    .then(function (response) {

                        that.newTrainning = cleanTrainningModel()
                        that.interactions.addTrainning = false;
                        that.interactions.isUpdate = false;
                        successNotify('', 'Treinamento salvo com sucesso.')
                        that.getTrainnings();
                    })
                    .catch(function (error) {
                        console.log(error)
                    });

            },

            removeTrainning: function(indexTrainning, trainningId){
                let that = this

                var data = {
                    client_id: that.client.id,
                    trainning_id: trainningId
                }

                that.$swal({
                    title: 'Excluir treinamento',
                    text: 'Tem certeza que gostaria de excluir este treinamento?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: '#82CB7D',
                    reverseButtons: true
                }).then(function () {

                    that.$http.post(`client/trainning/destroy`, data)
                    .then(function (response) {
                        that.trainnings.splice(indexTrainning, 1)
                        successNotify('', 'Treinamento excluído com sucesso.')
                        const index = that.interactions.trainningsCardOpened.indexOf(trainningId);
                        if(index > -1){
                            that.interactions.trainningsCardOpened.splice(index,1)
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    });

                }).catch(function () {

                })
            },

            restoreTrainning: function(indexTrainning, trainningId){
                let that = this

                var data = {
                    client_id: that.client.id,
                    trainning_id: trainningId
                }

                that.$swal({
                    title: 'Reativar treinamento',
                    text: 'Tem certeza que gostaria de reativar este treinamento?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: '#82CB7D',
                    reverseButtons: true
                }).then(function () {

                    that.$http.post(`client/trainning/undestroy`, data)
                    .then(function (response) {
                        that.trainnings_destroyeds.splice(indexTrainning, 1)
                        successNotify('', 'Treinamento restaurado com sucesso.')
                        that.getTrainnings();
                        const index = that.interactions.trainningsCardOpened.indexOf(trainningId);
                        if(index > -1){
                            that.interactions.trainningsCardOpened.splice(index,1)
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    });

                }).catch(function () {

                })

            },

            getDestroyedsTrainnings(){
                let that = this

                that.interactions.clickedToGetDestroyedList = true
                that.placeholder.destroyedList = true

                that.$http.post(`client/trainning/list/destroyeds`, {client_id: that.client.id})
                    .then(function (response) {
                        that.trainnings_destroyeds = response.data.trainnings_destroyeds
                        setTimeout(() => {
                            that.placeholder.destroyedList = false
                            that.interactions.clickedToGetDestroyedList = false
                        }, 200);
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            handleProfessional(professional) {
                this.categoriesLoading = true
                setTimeout(() => {
                    this.currentProfessional = professional
                    this.categoriesLoading = false
                }, 100)
            },

            categoriesCount(list) {
                return list.length - 2
            },

            // OPEN SYSTEM NAVIGATOR WITH PDF TO DOWNLOAD
            savePDF(trainning_id) {
                window.open( apiRootUrl + 'tools/print/trainning/' + trainning_id, '_system', null);
            },

        }
    }
</script>

<style scoped>
    .dow {
        position: absolute;
        top: -30px;
        left: 0px;
        font-weight: 300;
        font-size: 14px;
    }

    /* others styles */
    .table{
        background-color: #fff;
    }

    legend + table{
        margin-top: 20px;
    }

    /* Steps */
    .step-container {
        padding-top: 20px;
    }
    .step {
        background: #FFF;
        border: 1px solid #88C657;
        color: #383938;
        padding: 10px;
        overflow: hidden;
        font-weight: 300;
        font-size: 16px;
        text-align: center;
        cursor: pointer;
        align-items: center;
        display: flex;
        flex-flow: row wrap;
    }

    .step:first-child { border-radius: 4px 0 0 4px; }
    .step:last-child { border-radius: 0 4px 4px 0; }

    .step.swiper-slide-active {
        background: linear-gradient(to bottom, #6EC058 0%, #88C657 100%);
        color: #FFF;
    }

    .step.swiper-slide-active .step-index { background: #F4F5F5; color: #383938; }
    .step .step-index {
        font-weight: 400;
        display: inline-flex;
        width: 30px;
        height: 30px;
        align-items: center;
        justify-content: center;
        background: #F4F5F5;
        color: #383938;
        font-size: 12px;
        border-radius: 50%;
    }
    .step .step-label {
        margin-left: 10px;
        position: relative;
        top: 1px;
    }

    @media (max-width: 768px) {
        .step .step-label {
            width: 100%;
            margin-top: 10px;
            margin-left: 0;
        }
        .step .step-index{ margin: 0 auto; }
    }

    @media (max-width: 350px) {
        .step .step-label { font-size: 12px; }
    }

    /* Control */
    .control-prev,
    .control-next {
        position: absolute;
        top: 90px;
    }
    .control-prev { left: 20px; }
    .control-next { right: 20px; }
    @media (max-width: 768px) {
        .control-prev,
        .control-next { top: 120px; }
    }

    /* line-item-group */
    .line-item-group {
        margin: 5px 0;
        border: 1px solid RGBA(56, 57, 56, 0.15);
        padding: 0px 0px 21px 0px;
        border-radius: 4px;
    }

</style>
