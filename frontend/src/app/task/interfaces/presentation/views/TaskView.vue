<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <b-row>
        <b-col md="12">
          <b-card class="shadow-sm rounded-3">
            <b-card-body>
              <h4 class="text-center mb-4">Filtrar Tareas</h4>

              <b-row>
                <!-- Input de búsqueda -->
                <b-col md="12" lg="4" class="mb-3">
                  <b-input-group>
                    <b-input-group-prepend>
                      <span class="input-group-text bg-primary text-white"
                        >Buscar</span
                      >
                    </b-input-group-prepend>
                    <b-form-input
                      v-model="query.search"
                      @input="onSearchInput"
                      debounce="300"
                      placeholder="Buscar por nombre o descripción..."
                      class="rounded-0"
                    />
                  </b-input-group>
                </b-col>

                <!-- Select de prioridad -->
                <b-col md="6" lg="4" class="mb-3">
                  <b-input-group>
                    <b-input-group-prepend>
                      <span class="input-group-text bg-warning text-dark"
                        >Prioridad</span
                      >
                    </b-input-group-prepend>
                    <b-form-select
                      v-model="query.priority"
                      @change="onPriorityChange"
                      class="rounded-0"
                    >
                      <option value="">Todos</option>
                      <option value="low">Baja</option>
                      <option value="medium">Media</option>
                      <option value="high">Alta</option>
                    </b-form-select>
                  </b-input-group>
                </b-col>

                <!-- Select de completada -->
                <b-col md="6" lg="4" class="mb-3">
                  <b-input-group>
                    <b-input-group-prepend>
                      <span class="input-group-text bg-success text-white"
                        >Estado</span
                      >
                    </b-input-group-prepend>
                    <b-form-select
                      v-model="query.completed"
                      @change="onCompletedChange"
                      class="rounded-0"
                    >
                      <option :value="null">Todos</option>
                      <option :value="1">Completado</option>
                      <option :value="0">Pendiente</option>
                    </b-form-select>
                  </b-input-group>
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </base-header>
    <b-container fluid class="mt-7">
      <b-row>
        <b-col>
          <b-card>
            <b-card-header
              class="d-flex justify-content-between align-items-center"
            >
              <strong>Tareas</strong>
              <b-button variant="primary" size="m" @click="openModal"
                >Nueva Tarea</b-button
              >
            </b-card-header>
            <b-card-body>
              <vue-good-table
                :columns="columns"
                :rows="rows"
                :pagination-options="{
                  enabled: true,
                  perPage: query.limit,
                  perPageDropdownEnabled: true,
                  mode: 'remote',
                  total: query.total,
                  nextLabel: 'Siguiente',
                  prevLabel: 'Anterior',
                  rowsPerPageLabel: 'Tareas por pág',
                }"
                :totalRows="query.total"
                :currentPage="query.current_page"
                @on-page-change="onPageChange"
                @on-sort-change="onSortChange"
                @on-per-page-change="onPerPageChange"
              >
                <template #table-row="props">
                  <!-- Columna: priority -->
                  <span v-if="props.column.field === 'priority'"
                    ><span :class="priorityClass(props.row.priority)">
                      {{ priorityText(props.row.priority) }}
                    </span>
                  </span>
                  <!-- Columna: Completada -->
                  <span v-else-if="props.column.field === 'completed'">
                    <b-icon
                      :icon="
                        props.row.completed == 1
                          ? 'check-circle-fill'
                          : 'x-circle-fill'
                      "
                      :variant="props.row.completed == 1 ? 'success' : 'info'"
                      scale="1.2"
                    ></b-icon>
                    <span class="ml-2">
                      {{
                        props.row.completed == 1 ? "Completada" : "Pendiente"
                      }}
                    </span>
                  </span>

                  <span v-else-if="props.column.field === 'expires_at'">
                    <h2>
                      <b-badge
                        v-if="isDateExpired(props.row.expires_at)"
                        variant="warning"
                        class=""
                        >{{ props.row.expires_at }}</b-badge
                      >

                      <b-badge v-else variant="success" class="">{{
                        props.row.expires_at
                      }}</b-badge>
                    </h2>
                  </span>

                  <!-- Columna: Acciones -->
                  <span v-else-if="props.column.field === 'actions'">
                    <b-button
                      variant="info"
                      size="sm"
                      @click="editTask(props.row)"
                    >
                      Editar
                    </b-button>
                    <b-button
                      variant="outline-primary"
                      size="sm"
                      @click="goToComments(props.row)"
                    >
                      Comentarios
                    </b-button>
                    <b-button
                      variant="danger"
                      size="sm"
                      @click="deleteTask(props.row.id)"
                      class="ml-1"
                    >
                      Borrar
                    </b-button>
                  </span>

                  <!-- Otras columnas -->
                  <span v-else>
                    {{ props.formattedRow[props.column.field] }}
                  </span>
                </template>
              </vue-good-table>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <!-- Modal con formulario -->
    <b-modal
      hide-footer
      v-model="showModal"
      title="Nueva Tarea"
      @ok="handleSubmit"
    >
      <TaskForm
        ref="taskForm"
        :task="formData"
        @task-updated="handleTaskUpdated"
        @close="showModal = false"
      />
    </b-modal>
  </div>
</template>
<script>
import { VueGoodTable } from "vue-good-table";
import Task from "@/app/task/domain/entities/Task";
import { TaskRepositoryImpl } from "@/app/task/infrastructure/repositories/TaskRepositoryImpl";
import { ListTaskUseCase, DeleteTaskUseCase } from "@/app/task/usecases";
import {
  TableRequest,
  Order,
} from "@/app/global/requests/dtos/TableRequest.ts";
import "vue-good-table/dist/vue-good-table.css";
import TaskForm from "@/app/task/interfaces/presentation/components/TaskForm";
import Modal from "@/components/Modal";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Table,
  TableColumn,
} from "element-ui";

export default {
  components: {
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [VueGoodTable.name]: VueGoodTable,
    [TaskForm.name]: TaskForm,
    [Modal.name]: Modal,
  },
  data() {
    return {
      rows: [],
      columns: [
        { field: "name", label: "Name" },
        { field: "description", label: "Description" },
        { field: "priority", label: "Priority" },
        { field: "completed", label: "Completed" },
        { field: "expires_at", label: "expires_at" },
        {
          label: "Acciones",
          field: "actions",
          sortable: false,
          // width: "120px",
        },
      ],

      query: {
        limit: 10,
        offset: 0,
        order: Order.ASC,
        current_page: 1,
        sort_column: "id",
        sort_direction: Order.ASC,
        search: "",
      },
      showModal: false,

      formData: {
        name: "",
        description: null,
        priority: "low",
        completed: false,
        expires_at: null,
      },
    };
  },
  mounted() {
    this.fetchData();
  },
  watch: {},
  methods: {
    goToComments(task) {
      this.$store.commit("setSelectedTask", task);
      this.$router.push(`/tasks/${task.id}/edit`);
    },
    onPageChange(params) {
      this.query.current_page = params.currentPage;
      this.fetchData();
    },
    onPerPageChange(params) {
      this.query.limit = params.currentPerPage;
      this.query.current_page = 1;
      this.fetchData();
    },
    onCompletedChange() {
      this.query.current_page = 1;
      this.fetchData();
    },
    onSortChange(params) {
      if (params[0]) {
        this.query.sort_column = params[0].field;
        this.query.sort_direction =
          params[0].type === "asc" ? Order.ASC : Order.DESC;
      } else {
        this.query.sort_column = "id";
        this.query.sort_direction = Order.ASC;
      }
      this.fetchData();
    },
    isDateExpired(date) {
      if (!date) return false;
      const today = new Date().toISOString().slice(0, 10); // formato YYYY-MM-DD
      return date < today;
    },
    onSearchInput() {
      this.query.current_page = 1;
      this.fetchData();
    },
    async fetchData() {
      // store.isShowMainLoader = true;
      try {
        const taskRepository = new TaskRepositoryImpl();
        const listTaskUseCase = new ListTaskUseCase(taskRepository);
        const { data } = await listTaskUseCase.execute(this.query);
        this.rows = data.data;
        this.query.total = data.total;
      } catch (error) {
        console.error("Error fetching task", error);
      } finally {
        // store.isShowMainLoader = false;
      }
    },
    priorityClass(priority) {
      console.log(priority);
      switch (priority) {
        case "low":
          return "text-default"; // verde
        case "medium":
          return "text-info"; // amarillo
        case "high":
          return "text-danger"; // rojo
        default:
          return "text-default"; // gristn
      }
    },
    priorityText(priority) {
      switch (priority) {
        case "low":
          return "Baja";
        case "medium":
          return "Media";
        case "high":
          return "Alta";
        default:
          return "Sin prioridad";
      }
    },
    onPriorityChange() {
      this.query.current_page = 1;
      this.fetchData();
    },
    editTask(task) {
      this.showModal = true;
      this.$nextTick(() => {
        this.formData = { ...task };
      });
    },
    openModal() {
      this.showModal = true;
      this.$nextTick(() => {
        this.formData = {
          name: "",
          description: null,
          priority: "low",
          completed: false,
          expires_at: null,
        }; // Limpiar datos después de la actualización
      });
    },
    handleSubmit(bvModalEvent) {
      bvModalEvent.preventDefault();
      if (this.$refs.taskForm) {
        this.$refs.taskForm.$el.dispatchEvent(new Event("submit"));
      }
    },
    async deleteTask(id) {
      // this.boxOne = "";
      this.$bvModal
        .msgBoxConfirm("¿Estás seguro de eliminar esta tarea?")
        .then(async (value) => {
          const taskRepository = new TaskRepositoryImpl();
          const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
          await deleteTaskUseCase.execute(id);
        })
        .catch((err) => {
          // An error occurred
        })
        .finally(() => {
          this.fetchData(); // Recargar tabla
        });
    },

    handleTaskUpdated(updatedTask) {
      this.fetchData();
      this.showModal = false;
      this.$nextTick(() => {
        this.formData = {
          name: "",
          description: null,
          priority: "low",
          completed: false,
          expires_at: null,
        }; // Limpiar datos después de la actualización
      });
    },
  },
};
</script>
<style>
.el-table.table-dark {
  background-color: #172b4d;
  color: #f8f9fe;
}

.el-table.table-dark th,
.el-table.table-dark tr {
  background-color: #172b4d;
}

.el-table.table-dark td,
.el-table.table-dark th.is-leaf {
  border-bottom: none;
}
</style>
