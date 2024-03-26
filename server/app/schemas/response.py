from typing import TypeVar, Generic, Union, List
from pydantic import BaseModel

T = TypeVar("T")

class Response(BaseModel, Generic[T]):
    data: Union[T, List[T]]