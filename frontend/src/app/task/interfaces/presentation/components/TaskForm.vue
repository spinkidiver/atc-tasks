<template>
  <validation-observer v-slot="{ handleSubmit }" ref="formValidator">
    <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
      <b-form-group label="Nombre" label-class="form-control-label">
        <base-input
          alternative
          class="mb-3"
          name="Name"
          :rules="{ required: true }"
          placeholder="Name"
          v-model="formData.name"
        >
        </base-input>
      </b-form-group>

      <div class="">
        <b-form-group label="Descripcion" label-class="form-control-label">
          <!--  <label class="form-control-label">About Me</label> -->
          <b-form-textarea
            v-model="formData.description"
            rows="4"
            value=""
            id="about-form-textaria"
            placeholder="Description"
          ></b-form-textarea>
        </b-form-group>
      </div>
      <b-form-group label="Prioridad" label-class="form-control-label">
        <base-input :rules="{ required: true }" name="Priority" Policy>
          <b-form-select
            v-model="formData.priority"
            :options="PriorityOptions"
          ></b-form-select>
        </base-input>
      </b-form-group>

      <b-form-group label="Fecha exp." label-class="form-control-label">
        <base-input
          type="date"
          alternative
          class="mb-3"
          name="expires_at"
          :rules="{}"
          placeholder="expires_at"
          v-model="formData.expires_at"
        >
        </base-input>
      </b-form-group>

      <b-form-group>
        <base-input :rules="{}" name="Completed" Policy>
          <b-form-checkbox v-model="formData.completed">
            <span class="text-muted">Completado </span>
          </b-form-checkbox>
        </base-input>
      </b-form-group>

      <div class="text-right">
        <base-button type="secondary" @click="$emit('close')">
          Cancelar
        </base-button>
        <base-button type="primary" native-type="submit" class="my-4"
          >Guardar</base-button
        >
      </div>
    </b-form>
  </validation-observer>
</template>

<script>
import { TaskRepositoryImpl } from "@/app/task/infrastructure/repositories/TaskRepositoryImpl";
import { StoreTaskUseCase, UpdateTaskUseCase } from "@/app/task/usecases";

export default {
  name: "TaskForm",

  props: {
    task: {
      type: Object,
      default: () => ({
        name: "",
        description: "",
        priority: "low",
        completed: false,
        expires_at: null,
      }),
    },
  },

  data() {
    return {
      PriorityOptions: [
        { value: null, text: "Selecciona una opcion" },
        { value: "low", text: "Baja" },
        { value: "medium", text: "Media" },
        { value: "high", text: "Alta" },
      ],
      formData: { ...this.task },
      loading: false,
      error: null,
      backendErrors: {},
    };
  },

  watch: {
    task: {
      deep: true,
      immediate: true,
      handler(newVal) {
        this.formData = { ...newVal };
        this.formData.completed = !!newVal.completed;
      },
    },
  },

  methods: {
    async onSubmit() {
      try {
        const taskRepository = new TaskRepositoryImpl();
        let response;
        if (this.formData.id) {
          // Actualizar tarea existente
          const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
          response = await updateTaskUseCase.execute(this.formData);
          // this.$emit("task-updated", response);
        } else {
          // Crear nueva tarea
          const storeTaskUseCase = new StoreTaskUseCase(taskRepository);
          response = await storeTaskUseCase.execute(this.formData);
          // this.$emit("task-added", response);
        }

        // Limpiar formulario
        this.formData = {
          name: "",
          description: null,
          priority: "low",
          completed: false,
          expires_at: null,
        };

        this.$emit("task-updated", null);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          const errors = error.response.data.errors;
          // Limpia errores anteriores
          Object.keys(this.backendErrors).forEach((key) => {
            this.backendErrors[key] = "";
          });

          Object.entries(errors).forEach(([field, messages]) => {
            if (
              Object.prototype.hasOwnProperty.call(this.backendErrors, field)
            ) {
              this.backendErrors[field] = messages.join(", ");
            }
          });
        }
      }
    },
  },
};
</script>
