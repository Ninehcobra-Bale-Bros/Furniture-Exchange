import {
  Component,
  ViewChild,
  ElementRef,
  Inject,
  Optional,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { messages } from './chat-data';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ConversationService } from 'src/app/services/conversation.service';
import { LocalStorageUtil } from 'src/app/utils/local-storage.util';
import { ToastService } from 'src/app/services/toast.service';
import { IUser } from 'src/app/models/user.model';
import {
  IConversation,
  IConversationResponse,
  IGetConversationResponse,
} from 'src/app/models/conversation';
import { DateUtils } from 'src/app/utils/date-format.util';
import { SocketioService } from 'src/app/services/socket-io.service';
import { Router } from '@angular/router';
import { DeliveryService } from 'src/app/services/delivery.service';
import { ICreateShipmenPayload } from 'src/app/models/delivery.model';
import { IProduct } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class AppChatComponent implements OnInit, AfterViewInit {
  @ViewChild('chatContainer') private chatContainer: ElementRef;

  MAX_MESSAGE_LENGTH = 500;

  chatBox = document.getElementById('chat-box');

  userEventConversation: string = '';

  sidePanelOpened = true;
  msg = '';

  // MESSAGE
  selectedMessage: any;

  selectedConversation: {
    info: IConversation | null;
    data: IConversationResponse | null;
  } = { info: null, data: null };

  public messages: Array<any> = messages;
  // tslint:disable-next-line - Disables all

  user: IUser = LocalStorageUtil.get('user');
  conversations: IConversation[] = [];

  DateFormat = DateUtils.timeAgo;

  constructor(
    public dialog: MatDialog,
    public conversationService: ConversationService,
    private toastService: ToastService,
    private socketIoService: SocketioService
  ) {
    this.selectedMessage = this.messages[0];
  }
  ngAfterViewInit(): void {
    this.scrollToBottom();
  }
  async ngOnInit(): Promise<void> {
    await this.conversationService.getUserConversations().subscribe((res) => {
      this.conversations = res.conversations;

      this.socketIoService.connect();

      this.socketIoService.listen(res.conversation_name).subscribe(
        (data) => {
          console.log(`Received data for ${this.userEventConversation}:`, data);
          if (this.selectedConversation?.data?.messages) {
            this.selectedConversation.data.messages.push({
              isRead: false,
              content: data.content,
              created_at: new Date().toString(),
              sender_id: this.selectedConversation.data.other.id,
              id: data.id,
            });
            this.scrollToBottom();
          }
        },
        (error) => {
          console.error('Error listening to conversation:', error);
        }
      );

      if (this.conversations.length > 0) {
        this.selectedConversation.info = this.conversations[0];
        this.getConversationMessage(this.selectedConversation.info);
      }
    });

    this.scrollToBottom();
  }

  getConversationMessage(conversation: IConversation): void {
    if (this.selectedConversation.info?.user?.id) {
      this.conversationService
        .getConversationByOtherUserId(this.selectedConversation.info.user.id)
        .subscribe((res) => {
          this.selectedConversation = {
            info: conversation,
            data: res,
          };
          console.log('Selected conversation:', this.selectedConversation);
          this.scrollToBottom();
        });
    }
  }
  // getConversations() {
  //   this.conversationService
  //     .getUserConversation({ userId: this.user.id })
  //     .subscribe((res) => {
  //       this.conversations = res;
  //     });
  // }

  @ViewChild('myInput', { static: true }) myInput: ElementRef =
    Object.create(null);

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  createConversation(): void {
    this.openDialog('Add', {
      messages: 'hi',
    });
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(ChatbotDialogContentComponent, {
      data: obj,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        // this.conversationService
        //   .createConversation(result.data)
        //   .subscribe((res) => {
        //     this.conversationService
        //       .addUserToConversation({
        //         conversationId: res.id,
        //         userId: this.user.id,
        //       })
        //       .subscribe((res) => {
        //         this.getConversations();
        //         this.toastService.showSuccess('Conversation created');
        //       });
        //   });
      } else if (result.event === 'Update') {
      } else if (result.event === 'Delete') {
      }
    });
  }

  openShipmentDialog(action: string): void {
    const dialogRef = this.dialog.open(ShipmentDialogContentComponent, {
      data: {
        action,
        data: {
          buyer: this.selectedConversation.info?.user,
          user: this.user,
        },
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.action === 'Add') {
        } else if (result.action === 'Update') {
        } else if (result.action === 'Delete') {
        }
      }
    });
  }

  // tslint:disable-next-line - Disables all
  onSelect(conversation: IConversation): void {
    this.getConversationMessage(conversation);
  }

  scrollToBottom(): void {
    setTimeout(() => {
      try {
        this.chatContainer.nativeElement.scrollTop =
          this.chatContainer.nativeElement.scrollHeight;
      } catch (err) {
        console.error('Error scrolling to bottom:', err);
      }
    }, 0);
  }

  sanitizeInput(text: string): string {
    return text.replace(/<[^>]*>/g, '');
  }

  async OnAddMsg(): Promise<void> {
    this.msg = this.myInput.nativeElement.value;
    this.scrollToBottom();
    if (this.msg !== '' && this.selectedConversation.info?.user) {
      if (
        this.sanitizeInput(this.msg).length > 0 &&
        this.msg.length > this.MAX_MESSAGE_LENGTH
      ) {
        this.toastService.showError(
          'Message is too long or have some special characters. Please enter a valid message.'
        );
      } else {
        await this.socketIoService.sendMessage({
          content: this.msg,
          other_id: this.selectedConversation.data?.other.id,
          product: '',
        });
        this.selectedConversation.data?.messages.push({
          isRead: false,
          content: this.msg,
          created_at: new Date().toString(),
          sender_id: this.user.id,
          id: Math.random() * 100000,
        });
        this.scrollToBottom();
      }
    }

    this.scrollToBottom();
    this.myInput.nativeElement.value = '';
  }
}

@Component({
  selector: 'app-dialog-content',
  templateUrl: 'chatbot-dialog-content.html',
  styleUrl: 'chatbot-dialog-content.scss',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
  ],
})
// tslint:disable-next-line: component-class-suffix
export class ChatbotDialogContentComponent {
  action: string;
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';

  constructor(
    public dialogRef: MatDialogRef<ChatbotDialogContentComponent>,

    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  doAction(): void {
    if (this.action === 'Add') {
      const payload = {
        name: this.local_data.name,
      };
      this.dialogRef.close({ event: this.action, data: payload });
    } else {
      this.dialogRef.close({ event: this.action, data: this.local_data });
    }
  }
  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}

@Component({
  selector: 'app-shipment-dialog-content',
  templateUrl: 'shipment-dialog-content.html',
  styleUrls: ['shipment-dialog-content.scss'],
})
export class ShipmentDialogContentComponent implements OnInit {
  shipmentForm: FormGroup;
  maxQuantity: number = 0;
  products: IProduct[];
  selectedProduct: IProduct | null = null;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ShipmentDialogContentComponent>,
    private toastService: ToastService,
    private router: Router,
    private deliveryService: DeliveryService,
    private productService: ProductService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.shipmentForm = this.fb.group({
      other_id: ['', Validators.required],
      product_id: ['', Validators.required],
      other_fullname: ['', Validators.required],
      other_phone: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ],
      quantity: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(this.maxQuantity),
        ],
      ],
      pickup_address: ['', Validators.required],
      delivery_address: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data.data && this.data.data.buyer && this.data.data.buyer.id) {
      this.shipmentForm.patchValue({
        other_id: this.data.data.buyer.id,
        other_fullname:
          this.data.data.buyer.first_name +
          ' ' +
          this.data.data.buyer.last_name,
      });
    }

    if (this.data.data && this.data.data.user.role === 'seller') {
      this.fetchSellerProducts();
    }
    this.shipmentForm.get('product_id')?.valueChanges.subscribe((productId) => {
      this.selectedProduct =
        this.products.find((product) => product.id === productId) || null;
      this.maxQuantity = this.selectedProduct
        ? this.selectedProduct.quantity
        : 0;
      this.shipmentForm
        .get('quantity')
        ?.setValidators([
          Validators.required,
          Validators.min(1),
          Validators.max(this.maxQuantity),
        ]);
      this.shipmentForm.get('quantity')?.updateValueAndValidity();
    });
  }

  fetchSellerProducts(): void {
    this.productService.getSellerProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
        console.log(products);
      },
      (error) => {
        this.toastService.showError('Failed to fetch products');
      }
    );
  }

  doAction(): void {
    if (this.shipmentForm.valid) {
      const shipmentData: ICreateShipmenPayload = this.shipmentForm.value;

      console.log(shipmentData);
      this.deliveryService
        .createShipment({
          ...shipmentData,
          product_id: shipmentData.product_id,
        })
        .subscribe(
          (response) => {
            console.log('Server response:', response);
            this.dialogRef.close({ event: 'Add', data: response });
            this.toastService.showSuccess('Tạo đơn thành công');
            this.router.navigate([this.router.url]);
          },
          (error) => {
            this.toastService.showError('Lỗi tạo đơn');
          }
        );
    } else {
      this.toastService.showError('Hãy điền đầy đủ thông tin trước khi tạo');
    }
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
