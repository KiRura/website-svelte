import { Logger } from "tslog";

const logger = new Logger({ hideLogPositionForProduction: true });

const topId = "top";

export { logger, topId };
