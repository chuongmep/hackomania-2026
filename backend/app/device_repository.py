from clickhouse_connect.driver import Client


class DeviceRepository:
    def __init__(self, client: Client):
        self.client = client

    def _query_as_dicts(self, query: str) -> list[dict]:
        result = self.client.query(query)
        columns = result.column_names
        return [dict(zip(columns, row)) for row in result.result_rows]

    def get(self, device_id: str):
        return self._query_as_dicts(f"SELECT * FROM Devices WHERE DeviceId == '{device_id}'")
