import { startServer } from "@/infra/http/server";
import { ClusterService } from "@/infra/services/ClusterService";

const clusterService = new ClusterService();

clusterService.start(startServer);