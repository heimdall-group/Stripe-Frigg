<template>
  <v-col cols="12">
    <v-sheet rounded="xl" color="surface" class="pa-8">
      <v-table hover fixed-header height="600px">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Number</th>
            <th>Register completed</th>
            <th>Stripe Status</th>
            <th>Stripe Plan</th>
            <th>Ranks</th>
            <th>Stripe ID</th>
            <th>Firebase ID</th>
            <th>DB ID</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <th>{{ user.username }}</th>
            <th>
              <v-btn
                @click="() => {copyHandler(user.email)}"
                :disabled="!user.email"
                class="text-subtitle"
                variant="tonal"
              >
                <font-awesome-icon icon="fa-solid fa-copy" />
                <span class="ml-2 text-black">{{ user.email }}</span>
              </v-btn>
            </th>
            <th>
              <v-btn
                @click="() => {copyHandler(user.number)}"
                :disabled="!user.number"
                class="text-subtitle"
                variant="tonal"
              >
                <font-awesome-icon icon="fa-solid fa-copy" />
                <span class="ml-2 text-black">{{ user.number }}</span>
              </v-btn>
            </th>
            <th class="d-flex justify-center align-center">
              <font-awesome-icon class="text-h5" :icon="user.register_step" />
            </th>
            <th>{{ user.stripe_status }}</th>
            <th>{{ user.stripe_plan }}</th>
            <th>
              <v-menu :close-on-content-click="false">
                <template v-slot:activator="{ props: menu }">
                  <v-btn v-bind="menu" variant="tonal">
                    <font-awesome-icon icon="fa-solid fa-ellipsis" />
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item v-for="(rank, index) in ranks" :key="index">
                    <v-checkbox
                      @change="() => {changeHandler(user)}"
                      v-model="user.localRanks"
                      :label="rank"
                      :value="rank"
                      false-icon="mdi: mdi-checkbox-blank-outline"
                      true-icon="mdi: mdi-checkbox-marked"
                    ></v-checkbox>
                  </v-list-item>
                </v-list>
              </v-menu>
            </th>
            <th>
              <v-btn
                @click="() => {copyHandler(user.stripe_id)}"
                :disabled="!user.stripe_id"
                class="text-subtitle"
                variant="tonal"
              >
                <font-awesome-icon icon="fa-solid fa-copy" />
                <span class="ml-2 text-black">{{ user.stripe_id }}</span>
              </v-btn>
            </th>
            <th>
              <v-btn
                @click="() => {copyHandler(user.firebase_id)}"
                :disabled="!user.firebase_id"
                class="text-subtitle"
                variant="tonal"
              >
                <font-awesome-icon icon="fa-solid fa-copy" />
                <span class="ml-2 text-black">{{ user.firebase_id }}</span>
              </v-btn>
            </th>
            <th>
              <v-btn
                @click="() => {copyHandler(user.mongodb_id)}"
                :disabled="!user.mongodb_id"
                class="text-subtitle"
                variant="tonal"
              >
                <font-awesome-icon icon="fa-solid fa-copy" />
                <span class="ml-2 text-black">{{ user.mongodb_id }}</span>
              </v-btn>
            </th>
          </tr>
        </tbody>
      </v-table>
      <v-row justify="end" class="mt-4">
        <v-dialog
          transition="dialog-bottom-transition"
          v-model="changes_model"
          max-width="400px"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              flat
              :disabled="Object.keys(changes).length === 0"
              class="mx-2"
            >
              View Changes
            </v-btn>
          </template>
          <v-card class="pa-4" rounded="xl">
            <v-list>
              <v-list-item v-for="(change, index) of changes" :key="index">
                <v-list-item-title class="text-center">{{
                  change.email
                }}</v-list-item-title>
                <v-row class="ma-0">
                  <v-col cols="5" class="pa-0">
                    <v-list density="compact" class="pa-0">
                      <v-list-item
                        v-for="(from, index) in change.from"
                        :key="index"
                        color="purple"
                      >
                        {{ from }}
                      </v-list-item>
                    </v-list>
                  </v-col>
                  <v-col
                    cols="2"
                    class="d-flex align-center justify-center pa-0"
                  >
                    <font-awesome-icon icon="fa-solid fa-arrow-right" />
                  </v-col>
                  <v-col cols="5" class="pa-0">
                    <v-list density="compact" class="pa-0">
                      <v-list-item
                        v-for="(to, index) in change.to"
                        :key="index"
                        color="success"
                      >
                        {{ to }}
                      </v-list-item>
                    </v-list>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
              </v-list-item>
            </v-list>
            <v-row justify="end" class="ma-1">
              <v-btn flat class="mx-2" @click="resetChanges">
                Reset changes
              </v-btn>
              <v-btn
                flat
                class="mx-2"
                @click="changes_model = !changes_model"
                color="success"
              >
                Close
              </v-btn>
            </v-row>
          </v-card>
        </v-dialog>
        <v-dialog transition="dialog-bottom-transition" v-model="save_model" max-width="400px">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              flat
              color="success"
              :disabled="Object.keys(changes).length === 0"
              class="mx-2"
            >
              Save
            </v-btn>
          </template>
          <v-card class="pt-8 px-8 pb-4" rounded="xl">
            <v-form @submit="(event) => {onSubmitHandler(event, user)}"
            >
              <v-text-field
                label="Password"
                type="password"
                v-model="pwd"
                variant="outlined"
                :error-messages="alert.status ? alert.message : ''"
                :rules="[requiredRule, lengthRule]"
              ></v-text-field>
              <v-btn flat type="submit" color="success"> Confirm </v-btn>
            </v-form>
          </v-card>
        </v-dialog>
      </v-row>
    </v-sheet>
  </v-col>
</template>

<style scoped>
.fa-square-xmark {
  color: red;
}
.fa-square-check {
  color: green;
}
</style>

<script>
import { useMainStore } from '~/stores/mainStore';

export default {
  setup() {
    const store = useMainStore();
    return {
      store,
    };
  },
  name: 'adminProductRefreshComponent',
  data() {
    return {
      pwd: '123456',
      users: [],
      ranks: ['Admin', 'Support'],
      changes: {},
      changes_model: false,
      save_model: false,
      alert: {
        status: false,
        message: 'Incorrect password.',
      },
      requiredRule: (value) => !!value || 'Required.',
      lengthRule: (value) => {
        return value.length >= 6
          ? true
          : 'Password length needs to be atleast 6 characters';
      },
    };
  },
  computed: {
    store_user() {
      return this.store.getUser;
    },
  },
  props: {
    mobile: {
      required: true,
      type: Boolean,
    },
  },
  methods: {
    changeHandler(user) {
      const changes =
        JSON.stringify(user.ranks) !== JSON.stringify(user.localRanks);
      if (changes) {
        this.changes[user.firebase_id] = {
          email: user.email,
          from: user.ranks,
          to: user.localRanks,
        };
      } else {
        delete this.changes[user.firebase_id];
      }
    },
    resetChanges() {
      this.changes_model = false;
      for (let i = 0; i < this.users.length; i++) {
        const { firebase_id } = this.users[i];
        this.users[i].localRanks = this.users[i].ranks;
        delete this.changes[firebase_id];
      }
    },
    copyHandler(content) {
      navigator.clipboard.writeText(content);
    },
    async onSubmitHandler(event) {
      event.preventDefault();
      if (
        this.requiredRule(this.pwd) === true &&
        this.lengthRule(this.pwd) === true
      ) {
        const res = await verifyPassword(this.pwd);
        if (res && res.code === 'auth/wrong-password') {
          this.alert.status = true;
        } else {
          this.alert.status = false;
          const res = await $fetch('api/admin/patchUserRanks', {
            method: 'POST',
            body: {
              token: await this.store_user.getIdToken(),
              changes: this.changes,
            },
          });
          if (res.status) {
            this.changes = {};
            this.save_model = false;
          } else {
            console.log(res.error)
          }
        }
      } 
    },
  },
  async mounted() {
    this.users = await getAllUsers();
  },
  updated() {},
  components: {},
  emits: [],
};
</script>
